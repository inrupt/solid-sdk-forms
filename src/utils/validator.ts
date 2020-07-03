import moment from 'moment'
import { RDF, UI } from '@solid/lit-vocab-common'

const actionMethod = (condition: boolean, message: string) => {
  return {
    valid: condition,
    errorMessage: message
  }
}

export const validators = [
  {
    name: UI.required,
    action: (field: any) =>
      actionMethod(!(field.value === '' || !field.value), field[UI.requiredError])
  },
  {
    name: UI.pattern,
    action: (field: any) => {
      const regex = new RegExp(field[UI.pattern])
      return actionMethod(regex.test(field.value), field[UI.validationError])
    }
  },
  {
    name: UI.minLength,
    action: (field: any) =>
      actionMethod(field.value.length >= field[UI.minLength], field[UI.validationError])
  },
  {
    name: UI.maxLength,
    action: (field: any) =>
      actionMethod(field.value.length <= field[UI.maxLength], field[UI.validationError])
  },
  {
    name: UI.minValue,
    action: (field: any) => {
      if (field[RDF.type].includes('Date')) {
        return actionMethod(
          moment(field.value).isSameOrAfter(moment(field[UI.minValue])),
          field[UI.validationError]
        )
      }

      if (field[RDF.type] === UI.timeField.iriAsString) {
        const [hour, minute, second] = field.value.split(':').map((v: string) => Number(v))
        const [minHour, minMinute, minSecond] = field[UI.minValue]
          .split(':')
          .map((v: string) => Number(v))

        const baseTime = new Date()
        const fieldTime = moment(baseTime).set({ hour, minute, second })
        const maxTime = moment(baseTime).set({
          hour: minHour,
          minute: minMinute,
          second: minSecond
        })

        return actionMethod(fieldTime.isSameOrAfter(maxTime), field[UI.validationError])
      }

      return actionMethod(
        Number(field.value) >= Number(field[UI.minValue]),
        field[UI.validationError]
      )
    }
  },
  {
    name: UI.maxValue,
    action: (field: any) => {
      if (field[RDF.type].includes('Date')) {
        return actionMethod(
          moment(field.value).isSameOrBefore(moment(field[UI.maxValue])),
          field[UI.validationError]
        )
      }
      if (field[RDF.type] === UI.timeField.iriAsString) {
        const [hour, minute, second] = field.value.split(':').map((v: string) => Number(v))
        const [maxHour, maxMinute, maxSecond] = field[UI.maxValue]
          .split(':')
          .map((v: string) => Number(v))

        const baseTime = new Date()
        const fieldTime = moment(baseTime).set({ hour, minute, second })
        const maxTime = moment(baseTime).set({
          hour: maxHour,
          minute: maxMinute,
          second: maxSecond
        })

        return actionMethod(fieldTime.isSameOrBefore(maxTime), field[UI.validationError])
      }

      return actionMethod(
        Number(field.value) <= Number(field[UI.maxValue]),
        field[UI.validationError]
      )
    }
  },
  {
    name: UI.minDateOffset,
    action: (field: any) =>
      actionMethod(
        moment(field.value).isAfter(moment().subtract(field[UI.minDateOffset], 'd')),
        field[UI.validationError]
      )
  },
  {
    name: UI.maxDateOffset,
    action: (field: any) =>
      actionMethod(
        moment(field.value).isBefore(moment().add(field[UI.maxDateOffset], 'd')),
        field[UI.validationError]
      )
  },
  {
    name: UI.minDateTimeOffset,
    action: (field: any) => {
      if (field[UI.minValue]) return actionMethod(true, 'Skipped validation')

      return actionMethod(
        moment(field.value).isAfter(moment().subtract(field[UI.minDateTimeOffset], 'seconds')),
        field[UI.validationError]
      )
    }
  },
  {
    name: UI.maxDateTimeOffset,
    action: (field: any) => {
      if (field[UI.maxValue]) return actionMethod(true, 'Skipped validation')

      return actionMethod(
        moment(field.value).isBefore(moment().add(field[UI.maxDateTimeOffset], 'seconds')),
        field[UI.validationError]
      )
    }
  }
]
