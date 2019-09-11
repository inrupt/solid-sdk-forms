import uuid from 'uuid'
import data from '@solid/query-ldflex'
import { namedNode } from '@rdfjs/data-model'

export class FormActions {
  constructor(private formModel: any, private formObject: any) {}

  static getSubjectLinkId = (currentLink: string) => {
    if (currentLink.includes('#')) {
      const id = Date.now()
      return `${currentLink.split('#')[0]}#${id}`
    }
  }

  static cleanFieldNode = (field: any) => {
    let updatedField = field

    if (updatedField && updatedField['ui:parts']) {
      for (const childKey in updatedField['ui:parts']) {
        updatedField = {
          ...updatedField,
          'ui:parts': {
            ...updatedField['ui:parts'],
            [childKey]: {
              ...updatedField['ui:parts'][childKey],
              ...FormActions.cleanFieldNode(updatedField[childKey])
            }
          }
        }
      }
    }

    return {
      ...updatedField,
      ['ui:value']: '',
      ['ui:oldValue']: '',
      ['ui:name']: uuid()
    }
  }

  retrieveNewFormObject = (item: string, value: string): void => {
    this.formObject = { ...this.formObject, [item]: value }

    return this.formObject
  }

  saveData = async () => {
    const keyFields = Object.keys(this.formObject)

    for await (const key of keyFields) {
      const currentField = this.formObject[key]

      if (currentField) {
        const predicate = currentField['ui:property']
        let podData

        if (currentField.parent) {
          podData = data[currentField.parent['ui:value']][predicate]
          if (currentField['ui:oldValue'] !== '') {
            await podData.set(currentField.value)
          } else {
            const { parent } = currentField
            await data[parent['ui:base']][parent['ui:parentProperty']].add(
              namedNode(parent['ui:value'])
            )
            await podData.add(currentField.value)
          }
        } else {
          podData = data[currentField['ui:base']][predicate]

          if (currentField['ui:oldValue']) {
            await podData.set(currentField.value)
          } else {
            await podData.add(currentField.value)
          }
        }

        /**
         * Update ui:value and  ui:oldValue on formModel and reset formObject
         */
        this.updateFieldModel(currentField['ui:name'], currentField.value)
      }
    }
    this.resetFormObject()
  }

  static deleteFieldPod = async (field: any) => {
    if (field['ui:parentProperty']) {
      /**
       * Delete field from  link data reference
       */
      await data[field['ui:base']][field['ui:parentProperty']].delete(namedNode(field['ui:value']))
    } else {
      await data[field['ui:base']][field['ui:property']].delete(field['ui:value'])
    }
  }

  resetFormObject = () => {
    this.formObject = {}
  }

  updateFieldModel = (name: string, newValue: string) => {
    const partsObject = this.formModel['ui:parts']
    let found = false

    function findRecursive(name: string, value: string, model: any): any {
      for (const fieldKey in model) {
        if (model[fieldKey]['ui:name'] === name) {
          model = {
            ...model,
            [fieldKey]: {
              ...model[fieldKey],
              'ui:value': newValue,
              'ui:oldValue': newValue
            }
          }
          found = true
          break
        } else if (model[fieldKey]['ui:parts']) {
          model = {
            ...model,
            [fieldKey]: {
              ...model[fieldKey],
              ['ui:parts']: {
                ...findRecursive(name, value, model[fieldKey]['ui:parts'])
              }
            }
          }

          if (found) {
            break
          }
        }
      }
    }

    const updatedModel = findRecursive(name, newValue, partsObject)
    /**
     * Update private formModel store
     */
    this.formModel = { ...this.formModel, 'ui:parts': { ...updatedModel } }

    return this.formModel
  }

  deleteField = async (field: string) => {
    const partsObject = this.formModel['ui:parts']
    let found = false

    async function deleteRecursive(field: string, model: any) {
      try {
        const modelKeys = Object.keys(model)

        for await (const fieldKey of modelKeys) {
          if (model[fieldKey]['ui:name'] === field) {
            await FormActions.deleteFieldPod(model[fieldKey])

            const { [fieldKey]: value, ...withoutProperty } = model

            model = withoutProperty
            found = true
            break
          } else if (model[fieldKey]['ui:parts']) {
            model = {
              ...model,
              [fieldKey]: {
                ...model[fieldKey],
                ['ui:parts']: {
                  ...(await deleteRecursive(field, model[fieldKey]['ui:parts']))
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
      this.formModel = { ...this.formModel, 'ui:parts': { ...updatedModel } }

      return this.formModel
    } catch (error) {
      return Error(error)
    }
  }

  addNewField = (nodeName: string) => {
    let found = false
    let partsObject = this.formModel['ui:parts']

    function findField(nodeName: string, model: any) {
      for (const fieldKey in model) {
        const currentField = model[fieldKey]

        if (currentField['ui:name'] === nodeName && currentField['rdf:type'].includes('Multiple')) {
          const copiedField = Object.keys(currentField['ui:parts'])[0]
          const idLink = FormActions.getSubjectLinkId(
            currentField['ui:parts'][copiedField]['ui:value']
          )
          const uniqueName = uuid()

          model = {
            ...model,
            [fieldKey]: {
              ...currentField,
              ['ui:parts']: {
                ...currentField['ui:parts'],
                [uniqueName]: {
                  ...FormActions.cleanFieldNode(currentField['ui:parts'][copiedField]),
                  'ui:name': uniqueName,
                  'ui:value': idLink
                }
              }
            }
          }
          found = true
          break
        } else if (currentField['ui:parts']) {
          model = {
            ...model,
            [fieldKey]: {
              ...currentField,
              ...findField(nodeName, currentField['ui:parts'])
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

    return { ...this.formModel, 'ui:parts': { ...updatedParts } }
  }
}
