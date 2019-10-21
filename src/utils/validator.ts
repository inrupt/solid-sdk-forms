import moment from 'moment'

export const validators = [
  {
    name: 'ui:required',
    action: (field: any) => !(field.value === '' || !field.value)
  },
  {
    name: 'ui:pattern',
    action: (field: any) => field.match(field.pattern)
  },
  {
    name: 'ui:minLength',
    action: (field: any) => field.value.length >= field['minLength']
  },
  {
    name: 'ui:minLength',
    action: (field: any) => field.value.length <= field['maxLength']
  },
  {
    name: 'ui:minValue',
    action: (field: any) => {
      if (field['rdf:type'].includes('Date')) {
        return moment(field.value).isAfter(moment(field['ui:minValue']))
      }

      return field.value >= field['ui:minValue']
    }
  },
  {
    name: 'ui:maxValue',
    action: (field: any) => {
      if (field['rdf:type'].includes('Date')) {
        return moment(field.value).isBefore(moment(field['ui:maxValue']))
      }

      return field.value >= field['ui:maxValue']
    }
  },
  {
    name: 'ui:mindateOffset',
    action: (field: any) =>
      moment(field.value).isAfter(moment().subtract(field['ui:mindateOffset'], 'd'))
  },
  {
    name: 'ui:maxdateOffset',
    action: (field: any) =>
      moment(field.value).isBefore(moment().add(field['ui:maxdateOffset'], 'd'))
  }
]
