import { DataFactory, Store, Writer } from 'n3'
import {
  NS_RDF,
  NS_DC,
  NS_UI,
  NS_LAYOUT,
  IRI_XsdString,
  TRIPLE_CONSTRAINT,
  EACH_OF,
  NODE_CONSTRAINT
} from '@constants'
import { Meta } from '@interfaces'
import { ListObject } from './list-object'
import { namedNode } from '@rdfjs/data-model'
/**
 * Convert ShEx to Form Model
 * We are using n3 library for more info please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
 */
export class ShexFormModel {
  termFactory: any
  meta: Meta
  graph: any
  iriRdftype: string
  iriDctitle: string
  iriUitype: string

  constructor(private schema: any, private documentUri: string) {
    this.termFactory = DataFactory
    this.graph = new Store()
    this.meta = { prefixes: schema._prefixes, base: window.location.href }
    this.iriRdftype = `${NS_RDF}type`
    this.iriDctitle = `${NS_DC}title`
    this.iriUitype = this.iriRdftype
  }

  getSubjectNode(term: string) {
    return namedNode(`#${term}`)
  }
  /**
   * Convert SheEx to Form Model
   */
  convert() {
    const {
      schema,
      termFactory: { namedNode, blankNode, literal }
    } = this
    const IRI_this = '#'
    /**
     * Get root for term into ShexEx
     */
    const rootFormTerm = namedNode(`${IRI_this}formRoot`)
    /**
     * Find ShEx expression
     */
    const start =
      'start' in this.schema ? this.derefShapeExpression(schema.start) : schema.shapes[0]

    /**
     * Traverse the shape to create turtle object
     */
    this.walkShape(start, rootFormTerm, this.localName(start.id), namedNode, literal, blankNode)

    const writer = new Writer({
      prefixes: { '': IRI_this, ui: NS_UI, dc: NS_DC },
      listHeads: this.graph.sequesterLists()
    })
    writer.addQuads(this.graph.getQuads())
    let formModel
    writer.end((error, result) => (formModel = result))

    return formModel
  }
  /**
   * Find label expression into ShEx
   * @param shexpr
   */
  findTitle(shexpr: any) {
    return (shexpr.annotations || []).find((a: any) => a.predicate === this.iriDctitle)
  }

  /**
   * Define shape type into Form Model
   * @param iri
   */
  localName(iri: string) {
    const { meta } = this
    /**
     * If iri has _: already has the type format
     */
    if (iri.startsWith('_:')) {
      return iri
    }
    let prefix = Object.keys(meta.prefixes).find(p => iri.startsWith(meta.prefixes[p]))

    /**
     * Create iri type using string format <>
     */
    if (prefix) {
      return prefix + `:${iri.substr(meta[prefix].length)}`
    }
    /**
     * Return the type string
     */
    return `<${iri.startsWith(meta.base) ? iri.substr(meta.base.length) : iri}>`
  }
  /**
   *
   * @param shapeExpr
   */
  derefShapeExpression(shapeExpr: any) {
    if (typeof shapeExpr !== 'string') {
      return shapeExpr
    }
    const ret = this.findShapeExpression(shapeExpr)
    if (!ret) {
      throw Error(`unable to find shape expression "${shapeExpr}" in 
            ${this.schema.shapes.map((se: any) => se.id).join('\n')}`)
    }
    return ret
  }

  /**
   * Find shape expression with given name in schema.
   * returns: corresponding shape expression or undefined
   * @param {string} goal expression to find
   */
  findShapeExpression(goal: string) {
    return this.schema.shapes.find((se: any) => se.id === goal)
  }

  findShapeExpressionOptions(id: string) {
    let expression = null

    const currentShape = this.findShapeExpression(id)

    if (currentShape && currentShape.values) {
      const { values } = currentShape

      if (values[0].type && values[0].type.includes('boolean')) {
        return { type: 'BooleanField', default: '0' }
      } else {
        return { type: 'Classifier', values: values.map((value: any) => value.value) }
      }
    }

    return expression
  }

  /**
   * Traverse the shape and create the object with turtle format
   * @param shape
   * @param formTerm
   * @param path
   * @param namedNode
   * @param literal
   * @param blankNode
   */
  walkShape(shape: any, formTerm: any, path: string, namedNode: any, literal: any, blankNode: any) {
    try {
      const { graph } = this
      const sanitizedPath = path
        .substr(path.lastIndexOf('/'), path.length)
        .replace(/[^A-Za-z_-]/g, '_')
      const label = this.findTitle(shape)
      /**
       * insert one quad into n3 store
       */
      graph.addQuad(formTerm, namedNode(`${NS_RDF}type`), namedNode(`${NS_UI}Form`))

      if (label) {
        /**
         * insert one quad into n3 store
         */
        graph.addQuad(formTerm, namedNode(this.iriDctitle), literal(label.object.value))
      }

      let currentShape = shape

      if (!('expression' in shape) || shape.expression.type !== EACH_OF) {
        currentShape = {
          ...currentShape,
          expression: { expressions: [currentShape.expression] }
        }
      }

      // The UI vocabulary accepts only lists of atoms.
      let parts = new ListObject(formTerm, namedNode(`${NS_UI}parts`), graph, this.termFactory)

      if (currentShape && currentShape.expression && currentShape.expression.expressions) {
        currentShape.expression.expressions.forEach((te: any, i: any) => {
          const tePath = `${path}/[${i}]`
          if (te.type !== TRIPLE_CONSTRAINT) {
            throw Error(
              `expected ${tePath} of type ${TRIPLE_CONSTRAINT}, got: ${JSON.stringify(te)}`
            )
          }

          const fieldTerm =
            'id' in te ? this.jsonLdtoRdf(te.id) : blankNode(`${sanitizedPath}_parts_${i}_field`)

          const optionsType = this.findShapeExpressionOptions(te.valueExpr)
          let fieldType = te.valueExpr && te.valueExpr.values ? 'Classifier' : 'SingleLineTextField'

          if (optionsType) {
            const { type } = optionsType
            fieldType = type
          }

          let needFieldType = namedNode(NS_UI + fieldType)

          // copy annotations
          if ('annotations' in te)
            te.annotations.forEach((a: any) => {
              if (a.predicate === `${NS_LAYOUT}ref`) {
                return
              }

              if (a.predicate === this.iriRdftype) {
                needFieldType = null
              }

              if (a.predicate === `${NS_UI}contents`) {
                // ui:contents get their own item in the list
                const commentTerm =
                  'id' in te
                    ? this.jsonLdtoRdf(`${te.id}Comment`) // !! could collide, but easy to debug
                    : blankNode(`${sanitizedPath}_parts_${i}_comment`)
                /**
                 * insert one quad into n3 store
                 */

                graph.addQuad(commentTerm, namedNode(this.iriUitype), namedNode(`${NS_UI}Comment`))
                graph.addQuad(
                  commentTerm,
                  namedNode(`${NS_UI}contents`),
                  this.jsonLdtoRdf(a.object)
                )
                // add the parts list entry for comment
                parts.add(commentTerm, `${sanitizedPath}_parts_${i}_comment`)
              } else if (a.predicate.includes('label')) {
                /**
                 * insert one quad into n3 store
                 */
                graph.addQuad(
                  this.getSubjectNode(fieldTerm.id),
                  namedNode(`${NS_UI}label`),
                  this.jsonLdtoRdf(a.object)
                )
              } else {
                /**
                 * insert one quad into n3 store
                 */
                graph.addQuad(
                  this.getSubjectNode(fieldTerm.id),
                  this.jsonLdtoRdf(a.predicate),
                  this.jsonLdtoRdf(a.object)
                )
              }
            })

          // add the parts list entry for new field
          parts.add(this.getSubjectNode(fieldTerm.id), `${sanitizedPath}_parts_${i}`)

          // add property arc
          graph.addQuad(
            this.getSubjectNode(fieldTerm.id),
            namedNode(`${NS_UI}property`),
            this.jsonLdtoRdf(te.predicate)
          )
          let valueExpr =
            typeof te.valueExpr === 'string'
              ? this.derefShapeExpression(te.valueExpr)
              : te.valueExpr

          // add what we can guess from the value expression
          if (valueExpr.type === 'Shape') {
            needFieldType = null
            let groupId = blankNode(`${sanitizedPath}_parts_${i}_group`)
            graph.addQuad(
              this.getSubjectNode(fieldTerm.id),
              this.iriRdftype,
              namedNode(`${NS_UI}Multiple`)
            )
            graph.addQuad(this.getSubjectNode(fieldTerm.id), namedNode(`${NS_UI}parts`), groupId)

            this.walkShape(
              valueExpr,
              groupId,
              `${path}/@${this.localName(te.valueExpr)}`,
              namedNode,
              literal,
              blankNode
            )
          } else if (valueExpr.type === NODE_CONSTRAINT) {
            let nc = valueExpr
            if ('maxlength' in nc) {
              graph.addQuad(
                fieldTerm,
                namedNode(`${NS_UI}maxLength`),
                this.jsonLdtoRdf({ value: nc.maxlength })
              )
            }

            if ('pattern' in nc) {
              graph.addQuad(
                fieldTerm,
                namedNode(`${NS_UI}pattern`),
                this.jsonLdtoRdf({ value: nc.pattern })
              )
            }
          } else {
            throw Error(`Unsupported value expression on ${tePath}: ${JSON.stringify(valueExpr)}`)
          }

          // if there's no type, assume ui:SingleLineTextField
          if (needFieldType) {
            graph.addQuad(
              this.getSubjectNode(fieldTerm.id),
              namedNode(this.iriRdftype),
              needFieldType
            )
          }

          /**
           * Add Boolean and Classifier options
           */
          if (optionsType) {
            if (optionsType.type === 'BooleanField') {
              graph.addQuad(
                this.getSubjectNode(fieldTerm.id),
                namedNode(`${NS_UI}default`),
                this.jsonLdtoRdf({ value: '0' })
              )
            } else if (optionsType.type === 'Classifier') {
              if (optionsType.values) {
                let classifierParts = new ListObject(
                  `#${fieldTerm.id}`,
                  namedNode(`${NS_UI}values`),
                  graph,
                  this.termFactory
                )
                for (const value of optionsType.values) {
                  classifierParts.add(`"${value}"`)
                }
                classifierParts.end()
              }
            }
          }
        })
      }
      parts.end()
    } catch (error) {
      throw Error(error)
    }
  }
  /**
   * Convert jsonLd object to RDF object
   * @param ld
   */
  jsonLdtoRdf(ld: any) {
    const {
      termFactory: { namedNode, literal, blankNode }
    } = this
    if (typeof ld === 'object' && 'value' in ld) {
      let dtOrLang =
        ld.language || (ld.datatype && ld.datatype !== IRI_XsdString)
          ? ld.language
          : namedNode(ld.datatype)

      return literal(ld.value, dtOrLang)
    } else if (ld.startsWith('_:')) {
      return blankNode(ld.substr(2))
    } else {
      return namedNode(ld)
    }
  }
}
