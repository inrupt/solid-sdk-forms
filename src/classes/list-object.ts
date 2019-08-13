import { NS_RDF } from '../constants'

export class ListObject {
  s: string
  p: string
  graph: any
  termFactory: any
  NS_Rdf: string

  constructor(s: string, p: string, graph: any, termFactory: any) {
    this.s = s
    this.p = p
    this.graph = graph
    this.termFactory = termFactory
    this.NS_Rdf = NS_RDF
  }

  add(elt: any, label: string | undefined = undefined) {
    let partLi = this.termFactory.blankNode(label)
    this.graph.addQuad(this.s, this.p, partLi)
    this.graph.addQuad(partLi, this.termFactory.namedNode(`${this.NS_Rdf}first`), elt)
    this.s = partLi
    this.p = this.termFactory.namedNode(`${this.NS_Rdf}rest`)
    return partLi
  }

  end() {
    this.graph.addQuad(this.s, this.p, this.termFactory.namedNode(`${this.NS_Rdf}nil`))
  }
}
