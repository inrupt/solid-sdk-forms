import uuid from 'uuid'
import { FormModel } from 'src/solid-forms'

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

  retrieveNewFormObject = (item: string, value: string): any => {
    this.formObject = { ...this.formObject, [item]: value }
    return this.formObject
  }

  deleteField = (field: string) => {
    const partsObject = this.formModel['ui:parts']
    let found = false

    function deleteRecursive(field: string, model: any) {
      for (const fieldKey in model) {
        if (model[fieldKey]['ui:name'] === field) {
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
                ...deleteRecursive(field, model[fieldKey]['ui:parts'])
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

    const updatedModel = deleteRecursive(field, partsObject)
    /**
     * Update private formModel store
     */
    this.formModel = { ...this.formModel, 'ui:parts': { ...updatedModel } }

    return this.formModel
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
