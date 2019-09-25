import shexParser from '@shexjs/parser'
import shexCore from '@shexjs/core'
import * as N3 from 'n3'
import { ShExRSchema } from '@schemas'
import { solidFetch } from '@utils'
import { SHEX_SCHEMA } from '@constants'
import { ShexFormModel } from './shex-form-model'

export class FormModel {
  constructor(private url: string, private documentUri: string) {}
  /**
   * @param {String} url The URL of the shape or schema
   * @return {String} document extension
   */
  schemaType = (url: String) => {
    const name = url.split('.')
    return name[name.length - 1]
  }

  /**
   *
   * @param {String} schemaText The Shape Schema
   * @param {String} document The Document Url
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
   * We are using n3 library fro more information please go to: https://github.com/rdfjs/N3.js
   */
  parseTurtle = (schemaText: string, url: string) => {
    try {
      /**
       * N3.Store allows you to store triples in memory and find them fast.
       */
      const graph = new N3.Store()
      /**
       * N3.Parser transforms Turtle, TriG, N-Triples, or N-Quads document into quads through a callback
       */
      const parser = new N3.Parser({
        format: 'application/turtle',
        baseIRI: url
      })
      /**
       * Insert an array of quads
       */
      graph.addQuads(parser.parse(schemaText))

      const shexRSchemaObj = shexParser.construct(url, null, { index: true }).parse(ShExRSchema)
      const graphParser = shexCore.Validator.construct(shexRSchemaObj, {})
      /**
       * Insert an array of quads
       */
      const schemaRoot = graph.getQuads(null, shexCore.Util.RDF.type, SHEX_SCHEMA, '')[0].subject // !!check
      const val = graphParser.validate(
        shexCore.Util.makeN3DB(graph),
        schemaRoot,
        shexCore.Validator.start
      )
      /**
       * Convert ShEx to ShExJ
       */
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
      return this.normalize(JSON.parse(schemaText), url)
    } catch (error) {
      throw Error(error)
    }
  }
  /**
   * Parse Schema to Schema object
   */
  normalize = (object: any, base: any) => {
    for (let key in object) {
      let item = object[key]
      if (key === 'id' || (key === 'valueExpr' && typeof object[key] === 'string')) {
        object[key] = new URL(object[key], base).href
      } else if (typeof item === 'object') {
        this.normalize(item, base)
      }
    }
    return object
  }
  /**
   * Parse schema to Form Model
   */
  parseShEx = async (): Promise<any> => {
    try {
      const schema = await this.parseSchema(this.url)
      const formModel = new ShexFormModel(schema, this.documentUri)

      return formModel.convert()
    } catch (error) {
      throw Error(error)
    }
  }
}
