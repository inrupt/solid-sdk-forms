export class FormActions {
  constructor(private formModel: any, private formObject: any) {}
  retrieveNewFormObject = (item: string, value: string): any => {
    console.log('item', item, value)
    this.formObject = { ...this.formObject, [item]: value }
    return this.formObject
  }
}
