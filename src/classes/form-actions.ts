import uuid from 'uuid'
import data from '@solid/query-ldflex'
import { namedNode } from '@rdfjs/data-model'
import { UI } from '@solid/lit-vocab-common'
import { validator } from '@utils'
import { cloneDeep } from 'lodash'

/**
 * FormAction class to managament Form Model forms on solid
 */
export class FormActions {
  constructor(private formModel: any, private formObject: any) {}
  /**
   * Create random subject link for a node
   */
  static getSubjectLinkId = (currentLink: string) => {
    if (currentLink && currentLink.includes('#')) {
      const id = Date.now()
      return `${currentLink.split('#')[0]}#${id}`
    }
  }

  /**
   * Clean field node into Form Model object
   */
  static cleanFieldNode = (field: any) => {
    let updatedField = field
    if (updatedField && updatedField[UI.parts]) {
      for (const childKey in updatedField[UI.parts]) {
        updatedField = {
          ...updatedField,
          [UI.parts]: {
            ...updatedField[UI.parts],
            [childKey]: {
              ...updatedField[UI.parts][childKey],
              ...FormActions.cleanFieldNode(updatedField[childKey])
            }
          }
        }
      }
    }

    return {
      ...updatedField,
      [UI.value]: '',
      [UI.oldValue]: '',
      [UI.name]: uuid()
    }
  }
  /**
   * Retrieve new Form Object
   */
  retrieveNewFormObject = (item: string, value: string): void => {
    this.formObject = { ...this.formObject, [item]: value }

    return this.formObject
  }

  validator = (field: any) => {
    let updatedField = { ...field, [UI.valid]: true }

    try {
      for (const currentValidator of validator.validators) {
        if (Object.keys(field).find(key => key === currentValidator.name)) {
          const { valid, errorMessage } = currentValidator.action(field)
          if (!valid) {
            updatedField = {
              ...updatedField,
              [UI.valid]: valid,
              [UI.defaultError]: errorMessage
            }
            break
          }
        }
      }
    } catch (error) {
      throw Error(error)
    }

    return updatedField
  }
  /**
   * Save data into the pod
   */
  saveData = async (customFormObject?: any) => {
    // Get all unique names of fields in form model
    const keyFields = Object.keys(customFormObject || this.formObject)

    // For all items in the form model
    for await (const key of keyFields) {
      // Get the field
      const currentField = this.formObject[key]

      // Copy the field
      let validatedField = { ...currentField }

      if (currentField) {
        // Run the field through the validator to ensure it is valid according to constraints
        validatedField = this.validator(currentField)

        // Store if the field is a "Type" field
        const isType = currentField[UI.property].includes('type')

        // If the field is valid
        if (validatedField[UI.valid]) {
          const predicate = currentField[UI.property]
          let podData

          // Set the field copy object's value to a link to the value (if it is a type field) or the original object's value
          validatedField[UI.value] = isType ? namedNode(currentField.value) : currentField.value

          // Hack to support booleans in LDFlex. LDFlex does not properly recognize boolean types, so we convert it to a string
          const updatedValue =
            typeof validatedField[UI.value] === 'boolean'
              ? validatedField[UI.value].toString()
              : validatedField[UI.value]

          // If the field has a parent - this would happen if it is a part of a Group, so we can create new nodes for the Group to live in
          if (currentField.parent) {
            podData = isType
              ? data[currentField.parent[UI.value]].type
              : data[currentField.parent[UI.value]][predicate]

            // If there's no old value, this is a new field, so create the new node for it
            if (currentField[UI.oldValue] && currentField[UI.oldValue] !== '') {
              await podData.set(updatedValue)
              currentField[UI.value] = updatedValue
            } else {
              const { parent } = currentField
              await data[parent[UI.base]][parent[UI.parentProperty]].add(
                namedNode(parent[UI.value])
              )
              await podData.add(updatedValue)
              currentField[UI.value] = updatedValue
            }
          } else {
            podData = isType
              ? data[currentField[UI.base]].type
              : data[currentField[UI.base]][predicate]

            await podData.set(updatedValue)
            currentField[UI.value] = updatedValue
          }
        } else {
          throw new Error('Validation failed')
        }
      }
    }
    this.resetFormObject()
    return this.formModel
  }
  /**
   * Delete field from pod
   */
  static deleteFieldPod = async (field: any) => {
    // We need a base which serves as the subject for the field to delete
    if (field[UI.base]) {
      // If there is a parent_property we are deleting a full namedNode, like an address, not just a field
      if (field[UI.parentProperty]) {
        await data[field[UI.base]][field[UI.parentProperty]].delete(namedNode(field[UI.value]))
      } else {
        // TODO: for newly added groups,
        await data[field[UI.base]][field[UI.property]].delete(field[UI.value])
      }
    }
  }
  /**
   * Reset FormObject
   */
  resetFormObject = () => {
    this.formObject = {}
  }

  /**
   * Delete field from the form model object
   * This function recursively traverses the entire form model object to find the field to delete
   */
  deleteField = async (field: string) => {
    const partsObject = this.formModel[UI.parts]
    let found = false

    async function deleteRecursive(field: string, model: any) {
      try {
        const modelKeys = Object.keys(model)
        for await (const fieldKey of modelKeys) {
          // If we found the root node to delete
          if (model[fieldKey][UI.name] === field) {
            // First, loop over all parts, if any, that are contained in this node and delete them first
            const partToDelete = model[fieldKey]
            const parts = partToDelete[UI.parts] || partToDelete[UI.part]

            // When parts exist, this is a group. In fact, only groups have a delete for now
            if (parts) {
              // Loop over the group - in this case just the parent group
              for (const key of Object.keys(parts)) {
                const groupParts = partToDelete[UI.parts][key][UI.parts]
                await FormActions.deleteFieldPod(partToDelete[UI.parts][key])

                // Loop over each of the group parts and delete them individually. This prevents there
                // from being orphaned data in the pod
                for (const groupPartKey of Object.keys(groupParts)) {
                  await FormActions.deleteFieldPod(
                    partToDelete[UI.parts][key][UI.parts][groupPartKey]
                  )
                }
              }
            }

            // Second, delete the link of the Group os it is no longer referenced
            await FormActions.deleteFieldPod(partToDelete)

            // Save the results in the model
            const { [fieldKey]: value, ...withoutProperty } = model

            model = withoutProperty
            found = true
            break
          } else if (model[fieldKey][UI.part]) {
            // If this is not the node we want to delete, but the node has parts, keep walking the tree recursively
            model = {
              ...model,
              [fieldKey]: {
                ...model[fieldKey],
                [UI.part]: {
                  ...(await deleteRecursive(field, model[fieldKey][UI.part]))
                }
              }
            }

            if (found) {
              break
            }
          }
        }
        return model
      } catch (error) {
        throw error
      }
    }
    try {
      const updatedModel = await deleteRecursive(field, partsObject)
      /**
       * Update private formModel store
       */
      this.formModel = { ...this.formModel, [UI.parts]: { ...updatedModel } }

      return this.formModel
    } catch (error) {
      return Error(error)
    }
  }
  /**
   * Add new field into Form Model
   */
  addNewField = (nodeName: string) => {
    let found = false

    // Get list of parts from the form model
    let partsObject = this.formModel[UI.parts]

    function findField(nodeName: string, model: any) {
      for (const fieldKey in model) {
        const currentField = model[fieldKey]

        // If we find the right node
        if (currentField[UI.name] === nodeName) {
          // Get the key of the first item in clone parts
          const copiedField = Object.keys(currentField[UI.partsClone])[0]

          // Get a new subject based on the existing subject - so the new fields are siblings in the pod
          const idLink = FormActions.getSubjectLinkId(
            currentField[UI.partsClone][copiedField][UI.value]
          )

          // This field is used for deleting and adding immediately, so this be used before a refresh generates the correct value
          currentField[UI.base] = idLink

          // Generate a new unique ID for the form object
          const uniqueName = uuid()

          const parentProperty = currentField[UI.property]
          const parts = cloneDeep(currentField[UI.partsClone][copiedField])
          const cleanedNodes = FormActions.cleanFieldNode(parts)

          // Updates the new part's name and value, which is a subject for this part
          let partsNode = currentField[UI.part]
          partsNode[uniqueName] = {
            ...cleanedNodes,
            [UI.name]: uniqueName,
            [UI.value]: idLink,
            [UI.parentProperty]: parentProperty
          }

          const partsList = partsNode[uniqueName][UI.parts]

          // For each part in the parts list, update the parent property to point at the newly generated subject
          Object.keys(partsList).forEach(item => {
            partsList[item].parent = {
              ...partsList[item].parent,
              [UI.parentProperty]: currentField[UI.property],
              [UI.base]: idLink,
              [UI.value]: idLink
            }
            partsList[item][UI.base] = idLink

            // If the partsList has it's own parts (such as a Multiple containing a Group) then update all the sub parts to have the same subject in the value field
            // When we autosave fields, we get the context of just the field, so each field needs to have a copy of it's subject
            if (partsList[item][UI.parts]) {
              Object.keys(partsList[item][UI.parts]).forEach(subItem => {
                partsList[item][UI.parts][subItem].parent = {
                  ...partsList[item][UI.parts][subItem].parent,
                  [UI.value]: idLink
                }
              })
            }
          })

          found = true
          break
        }
      }
      return model
    }

    const updatedParts = findField(nodeName, partsObject)

    return { ...this.formModel, [UI.parts]: { ...updatedParts } }
  }
}
