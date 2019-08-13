"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var ListObject = /** @class */ (function () {
    function ListObject(s, p, graph, termFactory) {
        this.s = s;
        this.p = p;
        this.graph = graph;
        this.termFactory = termFactory;
        this.NS_Rdf = constants_1.NS_RDF;
    }
    ListObject.prototype.add = function (elt, label) {
        if (label === void 0) { label = undefined; }
        var partLi = this.termFactory.blankNode(label);
        this.graph.addQuad(this.s, this.p, partLi);
        this.graph.addQuad(partLi, this.termFactory.namedNode(this.NS_Rdf + "first"), elt);
        this.s = partLi;
        this.p = this.termFactory.namedNode(this.NS_Rdf + "rest");
        return partLi;
    };
    ListObject.prototype.end = function () {
        this.graph.addQuad(this.s, this.p, this.termFactory.namedNode(this.NS_Rdf + "nil"));
    };
    return ListObject;
}());
exports.ListObject = ListObject;
//# sourceMappingURL=list-object.js.map