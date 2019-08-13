"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
/**
 * convert JSON-LD term to an RDFJS term
 *
 */
function jsonLdtoRdf(ld, namedNode, literal, blankNode) {
    if (typeof ld === 'object' && 'value' in ld) {
        var dtOrLang = ld.language || (ld.datatype && ld.datatype !== constants_1.IRI_XsdString)
            ? ld.language : namedNode(ld.datatype);
        return literal(ld.value, dtOrLang);
    }
    else if (ld.startsWith('_:')) {
        return blankNode(ld.substr(2));
    }
    else {
        return namedNode(ld);
    }
}
exports.jsonLdtoRdf = jsonLdtoRdf;
//# sourceMappingURL=rdf.js.map