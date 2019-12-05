import moment from 'moment'

import { UI } from '@constants'

const actionMethod = (condition: boolean, message: string) => {
  return {
    valid: condition,
    errorMessage: message
  }
}

export const validators = [
  {
    name: UI.REQUIRED,
    action: (field: any) =>
      actionMethod(!(field.value === '' || !field.value), field[UI.REQUIRED_ERROR])
  },
  {
    name: UI.PATTERN,
    action: (field: any) => {
      const regex = new RegExp(field[UI.PATTERN])
      return actionMethod(regex.test(field.value), field[UI.VALIDATION_ERROR])
    }
  },
  {
    name: UI.MIN_LENGTH,
    action: (field: any) =>
      actionMethod(field.value.length >= field[UI.MIN_LENGTH], field[UI.VALIDATION_ERROR])
  },
  {
    name: UI.MAX_LENGTH,
    action: (field: any) =>
      actionMethod(field.value.length <= field[UI.MAX_LENGTH], field[UI.VALIDATION_ERROR])
  },
  {
    name: UI.MIN_VALUE,
    action: (field: any) => {
      if (field['rdf:type'].includes('Date')) {
        return actionMethod(
          moment(field.value).isAfter(moment(field[UI.MIN_VALUE])),
          field[UI.VALIDATION_ERROR]
        )
      }

      return actionMethod(field.value >= field[UI.MIN_VALUE], field[UI.VALIDATION_ERROR])
    }
  },
  {
    name: UI.MAX_VALUE,
    action: (field: any) => {
      if (field['rdf:type'].includes('Date')) {
        return actionMethod(
          moment(field.value).isBefore(moment(field[UI.MAX_VALUE])),
          field[UI.VALIDATION_ERROR]
        )
      }

      return actionMethod(field.value <= field[UI.MAX_VALUE], field[UI.VALIDATION_ERROR])
    }
  },
  {
    name: UI.MIN_DATE_OFFSET,
    action: (field: any) =>
      actionMethod(
        moment(field.value).isAfter(moment().subtract(field[UI.MIN_DATE_OFFSET], 'd')),
        field[UI.VALIDATION_ERROR]
      )
  },
  {
    name: UI.MAX_DATE_OFFSET,
    action: (field: any) =>
      actionMethod(
        moment(field.value).isBefore(moment().add(field[UI.MAX_DATE_OFFSET], 'd')),
        field[UI.VALIDATION_ERROR]
      )
  },
  {
    name: UI.MIN_DATE_TIME_OFFSET,
    action: (field: any) => {
      if (field[UI.MIN_VALUE]) return actionMethod(true, 'Skipped validation')

      return actionMethod(
        moment(field.value).isAfter(moment().subtract(field[UI.MIN_DATE_TIME_OFFSET], 'seconds')),
        field[UI.VALIDATION_ERROR]
      )
    }
  },
  {
    name: UI.MAX_DATE_TIME_OFFSET,
    action: (field: any) => {
      if (field[UI.MAX_VALUE]) return actionMethod(true, 'Skipped validation')

      return actionMethod(
        moment(field.value).isBefore(moment().add(field[UI.MAX_DATE_TIME_OFFSET], 'seconds')),
        field[UI.VALIDATION_ERROR]
      )
    }
  }
]
