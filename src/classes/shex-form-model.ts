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

  getFieldType(exp: any = {}) {
    /**
     * Check if field has values this mean that will be a Classifier
     */
    if (exp.values) {
      return 'Classifier'
    }
    /**
     * By default if not has dataType we will use text field
     */
    if (exp.datatype && !exp.datatype.includes('#')) {
      return 'SingleLineTextField'
    }

    /**
     * Get type from type prefix
     */
    const type = exp.datatype && exp.datatype.split('#')[1]

    switch (type) {
      case 'date':
        return 'DateField'
      case 'datetime':
        return 'DateTimeField'
      case 'time':
        return 'TimeField'
      case 'boolean':
        return 'BooleanField'
      case 'integer':
        return 'IntegerField'
      case 'decimal':
        return 'DecimalField'
      case 'float':
        return 'FloatField'
      case 'double':
        return 'FloatField'
      case 'nonPositiveInteger':
        return 'IntegerField'
      case 'negativeInteger':
        return 'IntegerField'
      case 'long':
        return 'IntegerField'
      case 'short':
        return 'IntegerField'
      case 'byte':
        return 'IntegerField'
      case 'nonNegativeInteger':
        return 'IntegerField'
      case 'unsignedLong':
        return 'IntegerField'
      case 'unsignedInt':
        return 'IntegerField'
      case 'unsignedShort':
        return 'IntegerField'
      case 'unsignedByte':
        return 'IntegerField'
      case 'positiveInteger':
        return 'IntegerField'
      default:
        // If we have a text field, with a maxlength of a certain value, change to a textarea
        if (exp.maxlength && exp.maxlength > 100) {
          return 'MultiLineTextField'
        } else {
          return 'SingleLineTextField'
        }
    }
  }
  /**
   * Convert SheEx to Form Model
   */
  convert() {
    const {
      schema,
      termFactory: { namedNode, blankNode, literal }
    } = this
    const IRI_THIS = '#'
    /**
     * Get root for term into ShexEx
     */
    const rootFormTerm = namedNode(`${IRI_THIS}formRoot`)
    /**
     * Find ShEx expression
     */
    const start =
      'start' in this.schema ? this.derefShapeExpression(schema.start) : schema.shapes[0]

    /**
     * Traverse the shape to create turtle object
     */
    this.walkShape(start, rootFormTerm, this.localName(start.id))
    const writer = new Writer({
      prefixes: { '': IRI_THIS, ui: NS_UI, dc: NS_DC },
      lists: this.graph.extractLists({ remove: true })
    })
    writer.addQuads(this.graph.getQuads())
    let formModel
    // tslint:disable-next-line:handle-callback-err
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

  /**
   * Checks if the expression is a Classifier (a dropdown)
   * @param expression
   */
  findShapeExpressionOptions(expression: any) {
    /**
     * In case it is not a Classifies it will ignore it
     */
    if (
      typeof expression === 'string' &&
      typeof this.findShapeExpression(expression) === 'string'
    ) {
      return null
    }

    /**
     * Validates the {values} field in the expression to confirm it is a Classifier/dropdown
     */
    if (expression && expression.values) {
      const { values } = expression
      return { type: 'Classifier', values: values.map((value: any) => value.value || value) }
    }

    return null
  }

  /**
   * Traverse the shape and create the object with turtle format
   * @param shape
   * @param formTerm
   * @param path
   * @param isGroup
   */
  walkShape(shape: any, formTerm: any, path: string, isGroup: boolean = false) {
    try {
      const { graph } = this
      const sanitizedPath = path
        .substr(path.lastIndexOf('/'), path.length)
        .replace(/[^A-Za-z_-]/g, '_')
      const label = this.findTitle(shape)
      const { literal, namedNode, blankNode } = this.termFactory
      const type = isGroup ? 'Group' : 'Form'
      /**
       * insert one quad into n3 store
       */
      graph.addQuad(formTerm, namedNode(`${NS_RDF}type`), namedNode(`${NS_UI}${type}`))

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
            'id' in te ? this.jsonLdtoRdf(te.id) : blankNode(`${sanitizedPath}_parts_${i}`)

          const optionsType = this.findShapeExpressionOptions(te.valueExpr)

          let fieldType = this.getFieldType(te.valueExpr)

          if (optionsType) {
            const { type } = optionsType
            fieldType = type
          }

          let needFieldType = namedNode(NS_UI + fieldType)

          // copy annotations
          if ('annotations' in te) {
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
              } else if (a && a.predicate && a.predicate.includes('label')) {
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
          }

          // add the parts list entry for new field
          parts.add(`#_:${sanitizedPath}_parts_${i}`)

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
            let groupId = namedNode(`#${sanitizedPath}_parts_${i}_group`)
            graph.addQuad(
              this.getSubjectNode(fieldTerm.id),
              this.iriRdftype,
              namedNode(`${NS_UI}Multiple`)
            )
            /**
             * Add parts of group into list
             */
            const groupParts = new ListObject(
              `#${fieldTerm.id}`,
              namedNode(`${NS_UI}parts`),
              graph,
              this.termFactory
            )
            groupParts.add(groupId)
            groupParts.end()

            this.walkShape(valueExpr, groupId, `${path}/@${this.localName(te.valueExpr)}`, true)
          } else if (valueExpr.type === NODE_CONSTRAINT) {
            let nc = valueExpr
            if ('maxlength' in nc) {
              graph.addQuad(
                this.getSubjectNode(fieldTerm.id),
                namedNode(`${NS_UI}maxLength`),
                this.jsonLdtoRdf({ value: nc.maxlength })
              )
            }

            if ('pattern' in nc) {
              graph.addQuad(
                this.getSubjectNode(fieldTerm.id),
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
