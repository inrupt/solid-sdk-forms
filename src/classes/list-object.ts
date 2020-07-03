import { RDF } from '@solid/lit-vocab-common'

export class ListObject {
  constructor(private s: string, private p: string, private graph: any, private termFactory: any) {
    this.graph = graph
    this.termFactory = termFactory
  }
  /**
   * Add object into Quad using n3
   * For more information please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
   * @param elt
   * @param label
   */
  add(elt: any, label: string | undefined = undefined) {
    let partLi = this.termFactory.blankNode(label)
    this.graph.addQuad(this.s, this.p, partLi)
    this.graph.addQuad(partLi, RDF.first, elt)
    this.s = partLi
    this.p = RDF.rest
    return partLi
  }

  end() {
    this.graph.addQuad(this.s, this.p, RDF.nil)
  }
}
