import moment from 'moment'

// import { RDF, UI } from '@inrupt/lit-generated-vocab-common';
import { RDF } from '@inrupt/lit-generated-vocab-common'
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
      if (field[RDF.type].includes('Date')) {
        return actionMethod(
          moment(field.value).isSameOrAfter(moment(field[UI.MIN_VALUE])),
          field[UI.VALIDATION_ERROR]
        )
      }

      if (field[RDF.type] === UI.TIME_FIELD) {
        const [hour, minute, second] = field.value.split(':').map((v: string) => Number(v))
        const [minHour, minMinute, minSecond] = field[UI.MIN_VALUE]
          .split(':')
          .map((v: string) => Number(v))

        const baseTime = new Date()
        const fieldTime = moment(baseTime).set({ hour, minute, second })
        const maxTime = moment(baseTime).set({
          hour: minHour,
          minute: minMinute,
          second: minSecond
        })

        return actionMethod(fieldTime.isSameOrAfter(maxTime), field[UI.VALIDATION_ERROR])
      }

      return actionMethod(
        Number(field.value) >= Number(field[UI.MIN_VALUE]),
        field[UI.VALIDATION_ERROR]
      )
    }
  },
  {
    name: UI.MAX_VALUE,
    action: (field: any) => {
      if (field[RDF.type].includes('Date')) {
        return actionMethod(
          moment(field.value).isSameOrBefore(moment(field[UI.MAX_VALUE])),
          field[UI.VALIDATION_ERROR]
        )
      }
      if (field[RDF.type] === UI.TIME_FIELD) {
        const [hour, minute, second] = field.value.split(':').map((v: string) => Number(v))
        const [maxHour, maxMinute, maxSecond] = field[UI.MAX_VALUE]
          .split(':')
          .map((v: string) => Number(v))

        const baseTime = new Date()
        const fieldTime = moment(baseTime).set({ hour, minute, second })
        const maxTime = moment(baseTime).set({
          hour: maxHour,
          minute: maxMinute,
          second: maxSecond
        })

        return actionMethod(fieldTime.isSameOrBefore(maxTime), field[UI.VALIDATION_ERROR])
      }

      return actionMethod(
        Number(field.value) <= Number(field[UI.MAX_VALUE]),
        field[UI.VALIDATION_ERROR]
      )
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
