import uuid from 'uuid'
import data from '@solid/query-ldflex'
import { namedNode } from '@rdfjs/data-model'
import { UI } from '@constants'
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

    return updatedField
  }
  /**
   * Save data intot he pod
   */
  saveData = async (customFormObject?: any) => {
    const keyFields = Object.keys(customFormObject || this.formObject)

    for await (const key of keyFields) {
      const currentField = this.formObject[key]
      let validatedField = { ...currentField }

      if (currentField) {
        validatedField = this.validator(currentField)

        const isType = currentField[UI.PROPERTY].includes('type')

        if (validatedField[UI.VALID]) {
          const predicate = currentField[UI.PROPERTY]
          const { value } = currentField
          let podData

          validatedField[UI.VALUE] = isType ? namedNode(currentField.value) : currentField.value
          const updatedValue = typeof value === 'boolean' ? value.toString() : value

          if (currentField.parent) {
            podData = isType
              ? data[currentField.parent[UI.VALUE]].type
              : data[currentField.parent[UI.VALUE]][predicate]

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
            podData = isType ? data[currentField[UI.BASE]] : data[currentField[UI.BASE]][predicate]
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
    if (field[UI.BASE]) {
      if (field[UI.PARENT_PROPERTY]) {
        /**
         * Delete field from  link data reference
         */
        await data[field[UI.BASE]][field[UI.PARENT_PROPERTY]].delete(namedNode(field[UI.VALUE]))
      } else {
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
   * Delete field into Form Model Object
   */
  deleteField = async (field: string) => {
    const partsObject = this.formModel[UI.PARTS]
    let found = false

    async function deleteRecursive(field: string, model: any) {
      try {
        const modelKeys = Object.keys(model)
        for await (const fieldKey of modelKeys) {
          if (model[fieldKey][UI.NAME] === field) {
            await FormActions.deleteFieldPod(model[fieldKey])

            const { [fieldKey]: value, ...withoutProperty } = model

            model = withoutProperty
            found = true
            break
          } else if (model[fieldKey][UI.PARTS]) {
            model = {
              ...model,
              [fieldKey]: {
                ...model[fieldKey],
                [UI.PARTS]: {
                  ...(await deleteRecursive(field, model[fieldKey][UI.PARTS]))
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
    let partsObject = this.formModel[UI.PARTS]

    function findField(nodeName: string, model: any) {
      for (const fieldKey in model) {
        const currentField = model[fieldKey]

        if (currentField[UI.NAME] === nodeName && currentField['rdf:type'].includes('Multiple')) {
          const copiedField = Object.keys(currentField[UI.CLONE_PARTS])[0]
          const idLink = FormActions.getSubjectLinkId(
            currentField[UI.CLONE_PARTS][copiedField][UI.VALUE]
          )
          const uniqueName = uuid()

          model = {
            ...model,
            [fieldKey]: {
              ...currentField,
              [UI.PARTS]: {
                ...currentField[UI.PARTS],
                [uniqueName]: {
                  ...FormActions.cleanFieldNode(currentField[UI.CLONE_PARTS][copiedField]),
                  [UI.NAME]: uniqueName,
                  [UI.VALUE]: idLink
                }
              }
            }
          }
          found = true
          break
        } else if (currentField[UI.PARTS]) {
          model = {
            ...model,
            [fieldKey]: {
              ...currentField,
              ...findField(nodeName, currentField[UI.PARTS])
            }
          }

          if (found) {
            break
          }
        }
      }
      return model
    }

    const updatedParts = findField(nodeName, partsObject)

    return { ...this.formModel, [UI.PARTS]: { ...updatedParts } }
  }
}
