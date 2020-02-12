import uuid from 'uuid'
import data from '@solid/query-ldflex'
import { namedNode } from '@rdfjs/data-model'
import { NS, RDF, UI } from '@constants'
import { validator } from '@utils'

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

    if (updatedField && updatedField[UI.PARTS]) {
      for (const childKey in updatedField[UI.PARTS]) {
        updatedField = {
          ...updatedField,
          [UI.PARTS]: {
            ...updatedField[UI.PARTS],
            [childKey]: {
              ...updatedField[UI.PARTS][childKey],
              ...FormActions.cleanFieldNode(updatedField[childKey])
            }
          }
        }
      }
    }

    return {
      ...updatedField,
      [UI.VALUE]: '',
      [UI.OLDVALUE]: '',
      [UI.NAME]: uuid()
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
    let updatedField = { ...field, [UI.VALID]: true }

    try {
      for (const currentValidator of validator.validators) {
        if (Object.keys(field).find(key => key === currentValidator.name)) {
          const { valid, errorMessage } = currentValidator.action(field)
          if (!valid) {
            updatedField = {
              ...updatedField,
              [UI.VALID]: valid,
              [UI.DEFAULT_ERROR]: errorMessage
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
      console.log('save function - currentField', currentField)

      // Copy the field
      let validatedField = { ...currentField }

      if (currentField) {
        // Run the field through the validator to ensure it is valid according to constraints
        validatedField = this.validator(currentField)

        // Store if the field is a "Type" field
        const isType = currentField[UI.PROPERTY].includes('type')

        // If the field is valid
        if (validatedField[UI.VALID]) {
          const predicate = currentField[UI.PROPERTY]
          let podData

          // Set the field copy object's value to a link to the value (if it is a type field) or the original object's value
          validatedField[UI.VALUE] = isType ? namedNode(currentField.value) : currentField.value

          // Hack to support booleans in LDFlex. LDFlex does not properly recognize boolean types, so we convert it to a string
          const updatedValue =
            typeof validatedField[UI.VALUE] === 'boolean'
              ? validatedField[UI.VALUE].toString()
              : validatedField[UI.VALUE]

          // If the field has a parent - this would happen if it is a part of a Group, so we can create new nodes for the Group to live in
          if (currentField.parent) {
            podData = isType
              ? data[currentField.parent[UI.VALUE]].type
              : data[currentField.parent[UI.VALUE]][predicate]

            // If there's no old value, this is a new field, so create the new node for it
            if (currentField[UI.OLDVALUE] && currentField[UI.OLDVALUE] !== '') {
              await podData.set(updatedValue)
            } else {
              const { parent } = currentField

              await data[parent[UI.BASE]][parent[UI.PARENT_PROPERTY]].add(
                namedNode(parent[UI.VALUE])
              )
              await podData.add(updatedValue)
            }
          } else {
            podData = isType
              ? data[currentField[UI.BASE]].type
              : data[currentField[UI.BASE]][predicate]
            if (currentField[UI.OLDVALUE]) {
              await podData.set(updatedValue)
            } else {
              await podData.add(updatedValue)
            }
          }
        } else {
          throw new Error('Validation failed')
        }
        /**
         * Update ui:value and  ui:oldValue on formModel and reset formObject
         */
        this.updateFieldModel(
          validatedField[UI.NAME],
          isType ? validatedField[UI.VALUE] : validatedField.value,
          validatedField[UI.VALID],
          validatedField[UI.DEFAULT_ERROR]
        )
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
    console.log('deletefieldpod', field)
    if (field[UI.BASE]) {
      console.log('UI BASE')
      // If there is a parent_property we are deleting a full namedNode, like an address, not just a field
      if (field[UI.PARENT_PROPERTY]) {
        console.log('---- delete node ----')
        console.log('subject', field[UI.BASE])
        console.log('predicate', field[UI.PARENT_PROPERTY])
        console.log('value to delete', field[UI.VALUE])
        await data[field[UI.BASE]][field[UI.PARENT_PROPERTY]].delete(namedNode(field[UI.VALUE]))
      } else {
        console.log('ELSE')
        await data[field[UI.BASE]][field[UI.PROPERTY]].delete(field[UI.VALUE])
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
   * Field field object into Form Model
   */
  updateFieldModel = (
    name: string,
    newValue: string,
    valid: boolean = true,
    errorMessage: string
  ) => {
    const partsObject = this.formModel[UI.PARTS]
    let found = false

    function findRecursive(name: string, value: string, model: any): any {
      for (const fieldKey in model) {
        if (model[fieldKey][UI.NAME] === name) {
          model = {
            ...model,
            [fieldKey]: {
              ...model[fieldKey],
              [UI.VALUE]: newValue,
              [UI.OLDVALUE]: newValue !== '' ? newValue : model[fieldKey][UI.OLDVALUE],
              [UI.VALID]: valid,
              [UI.DEFAULT_ERROR]: errorMessage
            }
          }
          found = true
          break
        } else if (model[fieldKey][UI.PARTS]) {
          model = {
            ...model,
            [fieldKey]: {
              ...model[fieldKey],
              [UI.PARTS]: {
                ...findRecursive(name, value, model[fieldKey][UI.PARTS])
              }
            }
          }

          if (found) {
            break
          }
        }
      }
      return model
    }
    try {
      const updatedModel = findRecursive(name, newValue, partsObject)
      /**
       * Update private formModel store
       */
      this.formModel = { ...this.formModel, [UI.PARTS]: { ...updatedModel } }

      return this.formModel
    } catch (error) {
      return Error(error)
    }
  }

  /**
   * Delete field from the form model object
   * This function recursively traverses the entire form model object to find the field to delete
   */
  deleteField = async (field: string) => {
    const partsObject = this.formModel[UI.PARTS]
    let found = false

    async function deleteRecursive(field: string, model: any) {
      try {
        const modelKeys = Object.keys(model)
        for await (const fieldKey of modelKeys) {
          // If we found the root node to delete
          if (model[fieldKey][UI.NAME] === field) {
            // First, loop over all parts, if any, that are contained in this node and delete them first
            const partToDelete = model[fieldKey]
            const parts = partToDelete[UI.PARTS] || partToDelete[UI.PART]

            // When parts exist, this is a group. In fact, only groups have a delete for now
            if (parts) {
              // Loop over the group - in this case just the parent group
              for (const key of Object.keys(parts)) {
                const groupParts = partToDelete[UI.PARTS][key][UI.PARTS]
                await FormActions.deleteFieldPod(partToDelete[UI.PARTS][key])

                // Loop over each of the group parts and delete them individually. This prevents there
                // from being orphaned data in the pod
                for (const groupPartKey of Object.keys(groupParts)) {
                  await FormActions.deleteFieldPod(
                    partToDelete[UI.PARTS][key][UI.PARTS][groupPartKey]
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
          } else if (model[fieldKey][UI.PART]) {
            // If this is not the node we want to delete, but the node has parts, keep walking the tree recursively
            model = {
              ...model,
              [fieldKey]: {
                ...model[fieldKey],
                [UI.PART]: {
                  ...(await deleteRecursive(field, model[fieldKey][UI.PART]))
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
      this.formModel = { ...this.formModel, [UI.PARTS]: { ...updatedModel } }

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
    let partsObject = this.formModel[UI.PARTS]

    function findField(nodeName: string, model: any) {
      for (const fieldKey in model) {
        const currentField = model[fieldKey]

        // If we find the right node
        if (currentField[UI.NAME] === nodeName) {
          // Get the key of the first item in clone parts
          const copiedField = Object.keys(currentField[UI.CLONE_PARTS])[0]

          // Get a new subject based on the existing subject - so the new fields are siblings in the pod
          const idLink = FormActions.getSubjectLinkId(
            currentField[UI.CLONE_PARTS][copiedField][UI.VALUE]
          )

          // Generate a new unique ID for the form object
          const uniqueName = uuid()

          const parentProperty = currentField[UI.PROPERTY]
          const parts = currentField[UI.CLONE_PARTS][copiedField]

          // Add the new set of parts, copied from cloneParts node, into the model and return
          model = {
            ...model,
            [fieldKey]: {
              ...currentField,
              [UI.PART]: {
                ...currentField[UI.PART],
                [uniqueName]: {
                  ...FormActions.cleanFieldNode(parts),
                  [UI.NAME]: uniqueName,
                  [UI.VALUE]: idLink,
                  [UI.PARENT_PROPERTY]: parentProperty
                }
              }
            }
          }

          const partsList = model[fieldKey][UI.PART][uniqueName][UI.PARTS]

          Object.keys(partsList).forEach(item => {
            partsList[item].parent = {
              [UI.VALUE]: idLink,
              [UI.PARENT_PROPERTY]: currentField[UI.PROPERTY],
              [UI.BASE]: currentField[UI.BASE]
            }
          })

          // The value holds the subject for the node, but this is being lost somewhere in translation so I'm storing that in UI:BASE for now
          const newValueObj = model[fieldKey][UI.PART][uniqueName]
          Object.keys(newValueObj[UI.PARTS]).forEach(key => {
            // @ts-ignore
            newValueObj[UI.PARTS][key][UI.BASE] = newValueObj[UI.VALUE]
          })

          found = true
          break
        }
      }

      return model
    }

    const updatedParts = findField(nodeName, partsObject)

    return { ...this.formModel, [UI.PARTS]: { ...updatedParts } }
  }
}
