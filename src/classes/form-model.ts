import shexParser from '@shexjs/parser'
import shexCore from '@shexjs/core'
import * as N3 from 'n3'
import { ShExRSchema } from '../schemas'
import { solidFetch } from '../utils'
import { ShexFormModel } from './shex-form-model'
import { SHEX_SCHEMA } from '../constants'

export class FormModel {
  constructor(private url: string) {}
  /**
   * @param {String} url the schema document url
   * @return {String} document extension
   */
  schemaType = (url: String) => {
    const name = url.split('.')
    return name[name.length - 1]
  }

  /**
   *
   * @param {String} schemaText the document content
   * @param {String} document url
   */
  parseShexC = (schemaText: String, url: String) => {
    try {
      const parser = shexParser.construct(url, null, { index: true })

      return parser.parse(schemaText)
    } catch (error) {
      throw Error(error)
    }
  }

  /**
   * Convert ShEx to Turtle object
   */
  parseTurtle = (schemaText: string, url: string) => {
    try {
      const graph = new N3.Store()
      const parser = new N3.Parser({
        format: 'application/turtle',
        baseIRI: url
      })
      graph.addQuads(parser.parse(schemaText))

      const shexRSchemaObj = shexParser.construct(url, null, { index: true }).parse(ShExRSchema)
      const graphParser = shexCore.Validator.construct(shexRSchemaObj, {})
      const schemaRoot = graph.getQuads(null, shexCore.Util.RDF.type, SHEX_SCHEMA, '')[0].subject // !!check
      const val = graphParser.validate(
        shexCore.Util.makeN3DB(graph),
        schemaRoot,
        shexCore.Validator.start
      ) // start shape
      return shexCore.Util.ShExRtoShExJ(
        shexCore.Util.valuesToSchema(shexCore.Util.valToValues(val))
      )
    } catch (error) {
      throw Error(error)
    }
  }

  /**
   * Parse schema from shEx, turtle or json files
   */
  parseSchema = async (url: string) => {
    try {
      const schemaText = await solidFetch.fetchSchema(url)
      const format = this.schemaType(url)
      let schema

      switch (format.toLowerCase()) {
        case 'shex':
          schema = this.parseShexC(schemaText, url)
          break

        case 'ttl':
          schema = this.parseTurtle(schemaText, url)
          break

        case 'json':
          schema = this.parseShexJ(schemaText, url)
          break

        default:
          throw new Error('File not supported.')
      }

      return schema
    } catch (error) {
      throw Error(error)
    }
  }

  parseShexJ = (schemaText: string, url: string) => {
    try {
      return this.relativeize(JSON.parse(schemaText), url)
    } catch (error) {
      throw Error(error)
    }
  }

  relativeize = (object: any, base: any) => {
    for (let key in object) {
      let item = object[key]
      if (key === 'id' || (key === 'valueExpr' && typeof object[key] === 'string')) {
        object[key] = new URL(object[key], base).href
      } else if (typeof item === 'object') {
        this.relativeize(item, base)
      }
    }
    return object
  }
  /**
   * Parse schema to Tim Form Model
   */
  parseShEx = async (): Promise<any> => {
    try {
      const schema = await this.parseSchema(this.url)
      const formModel = new ShexFormModel(schema)

      return formModel.convert()
    } catch (error) {
      throw Error(error)
    }
  }
}
