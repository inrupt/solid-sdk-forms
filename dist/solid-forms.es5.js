import shexParser from '@shexjs/parser';
import shexCore from '@shexjs/core';
import N3 from 'n3';
import auth from 'solid-auth-client';
import '@solid/query-ldflex';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ShExRSchema = "PREFIX sx: <http://www.w3.org/ns/shex#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nBASE <http://www.w3.org/ns/shex#>\nstart=@<Schema>\n\n<Schema> CLOSED {\n  a [sx:Schema] ;\n  sx:imports @<IriList1Plus>? ;\n  sx:startActs @<SemActList1Plus>? ;\n  sx:start @<shapeExpr>?;\n  sx:shapes @<shapeExpr>*\n}\n\n<shapeExpr> @<ShapeOr> OR @<ShapeAnd> OR @<ShapeNot> OR @<NodeConstraint> OR @<Shape> OR @<ShapeExternal>\n\n<ShapeOr> CLOSED {\n  a [sx:ShapeOr] ;\n  sx:shapeExprs @<shapeExprList2Plus>\n}\n\n<ShapeAnd> CLOSED {\n  a [sx:ShapeAnd] ;\n  sx:shapeExprs @<shapeExprList2Plus>\n}\n\n<ShapeNot> CLOSED {\n  a [sx:ShapeNot] ;\n  sx:shapeExpr @<shapeExpr>\n}\n\n<NodeConstraint> CLOSED {\n  a [sx:NodeConstraint] ;\n  sx:nodeKind [sx:iri sx:bnode sx:literal sx:nonliteral]?;\n  sx:datatype IRI ? ;\n  &<xsFacets>  ;\n  sx:values @<valueSetValueList1Plus>?\n}\n\n<Shape> CLOSED {\n  a [sx:Shape] ;\n  sx:closed [true false]? ;\n  sx:extra IRI* ;\n  sx:expression @<tripleExpression>? ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>? ;\n}\n\n<ShapeExternal> CLOSED {\n  a [sx:ShapeExternal] ;\n}\n\n<SemAct> CLOSED {\n  a [sx:SemAct] ;\n  sx:name IRI ;\n  sx:code xsd:string?\n}\n\n<Annotation> CLOSED {\n  a [sx:Annotation] ;\n  sx:predicate IRI ;\n  sx:object @<objectValue>\n}\n\n# <xsFacet> @<stringFacet> OR @<numericFacet>\n<facet_holder> { # hold labeled productions\n  $<xsFacets> ( &<stringFacet> | &<numericFacet> )* ;\n  $<stringFacet> (\n      sx:length xsd:integer\n    | sx:minlength xsd:integer\n    | sx:maxlength xsd:integer\n    | sx:pattern xsd:string ; sx:flags xsd:string?\n  );\n  $<numericFacet> (\n      sx:mininclusive   @<numericLiteral>\n    | sx:minexclusive   @<numericLiteral>\n    | sx:maxinclusive   @<numericLiteral>\n    | sx:maxexclusive   @<numericLiteral>\n    | sx:totaldigits    xsd:integer\n    | sx:fractiondigits xsd:integer\n  )\n}\n<numericLiteral> xsd:integer OR xsd:decimal OR xsd:double\n\n<valueSetValue> @<objectValue> OR @<IriStem> OR @<IriStemRange>\n                               OR @<LiteralStem> OR @<LiteralStemRange>\n                OR @<Language> OR @<LanguageStem> OR @<LanguageStemRange>\n<objectValue> IRI OR LITERAL # rdf:langString breaks on Annotation.object\n<Language> CLOSED { a [sx:Language]; sx:languageTag xsd:string }\n<IriStem> CLOSED { a [sx:IriStem]; sx:stem xsd:string }\n<IriStemRange> CLOSED {\n  a [sx:IriStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<IriStemExclusionList1Plus>\n}\n<LiteralStem> CLOSED { a [sx:LiteralStem]; sx:stem xsd:string }\n<LiteralStemRange> CLOSED {\n  a [sx:LiteralStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<LiteralStemExclusionList1Plus>\n}\n<LanguageStem> CLOSED { a [sx:LanguageStem]; sx:stem xsd:string }\n<LanguageStemRange> CLOSED {\n  a [sx:LanguageStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<LanguageStemExclusionList1Plus>\n}\n<Wildcard> BNODE CLOSED {\n  a [sx:Wildcard]\n}\n\n<tripleExpression> @<TripleConstraint> OR @<OneOf> OR @<EachOf> OR CLOSED {  }\n\n<OneOf> CLOSED {\n  a [sx:OneOf] ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:expressions @<tripleExpressionList2Plus> ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<EachOf> CLOSED {\n  a [sx:EachOf] ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:expressions @<tripleExpressionList2Plus> ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<tripleExpressionList2Plus> CLOSED {\n  rdf:first @<tripleExpression> ;\n  rdf:rest @<tripleExpressionList1Plus>\n}\n<tripleExpressionList1Plus> CLOSED {\n  rdf:first @<tripleExpression> ;\n  rdf:rest  [rdf:nil] OR @<tripleExpressionList1Plus>\n}\n\n<TripleConstraint> CLOSED {\n  a [sx:TripleConstraint] ;\n  sx:inverse [true false]? ;\n  sx:negated [true false]? ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:predicate IRI ;\n  sx:valueExpr @<shapeExpr>? ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<IriList1Plus> CLOSED {\n  rdf:first IRI ;\n  rdf:rest  [rdf:nil] OR @<IriList1Plus>\n}\n\n<SemActList1Plus> CLOSED {\n  rdf:first @<SemAct> ;\n  rdf:rest  [rdf:nil] OR @<SemActList1Plus>\n}\n\n<shapeExprList2Plus> CLOSED {\n  rdf:first @<shapeExpr> ;\n  rdf:rest  @<shapeExprList1Plus>\n}\n<shapeExprList1Plus> CLOSED {\n  rdf:first @<shapeExpr> ;\n  rdf:rest  [rdf:nil] OR @<shapeExprList1Plus>\n}\n\n<valueSetValueList1Plus> CLOSED {\n  rdf:first @<valueSetValue> ;\n  rdf:rest  [rdf:nil] OR @<valueSetValueList1Plus>\n}\n\n<AnnotationList1Plus> CLOSED {\n  rdf:first @<Annotation> ;\n  rdf:rest  [rdf:nil] OR @<AnnotationList1Plus>\n}\n\n<IriStemExclusionList1Plus> CLOSED {\n  rdf:first IRI OR @<IriStem> ;\n  rdf:rest  [rdf:nil] OR @<IriStemExclusionList1Plus>\n}\n\n<LiteralStemExclusionList1Plus> CLOSED {\n  rdf:first xsd:string OR @<LiteralStem> ;\n  rdf:rest  [rdf:nil] OR @<LiteralStemExclusionList1Plus>\n}\n\n<LanguageStemExclusionList1Plus> CLOSED {\n  rdf:first xsd:string OR @<LanguageStem> ;\n  rdf:rest  [rdf:nil] OR @<LanguageStemExclusionList1Plus>\n}\n";
//# sourceMappingURL=shexRs.js.map

var _this = null;
var fetchSchema = function (file) { return __awaiter(_this, void 0, void 0, function () {
    var schemaDocument, documentText, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, auth.fetch(file, {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })];
            case 1:
                schemaDocument = _a.sent();
                if (schemaDocument.status !== 200) {
                    throw schemaDocument;
                }
                return [4 /*yield*/, schemaDocument.text()];
            case 2:
                documentText = _a.sent();
                return [2 /*return*/, documentText.toString()];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, error_1];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=solid-fetch.js.map

var NS_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#"';
var NS_DC = 'http://purl.org/dc/elements/1.1/';
var NS_UI = 'http://www.w3.org/ns/ui#';
var NS_LAYOUT = 'http://janeirodigital.com/layout#';
var IRI_Xsd = 'http://www.w3.org/2001/XMLSchema#';
var IRI_XsdString = IRI_Xsd + "string";
//# sourceMappingURL=index.js.map

var ListObject = /** @class */ (function () {
    function ListObject(s, p, graph, termFactory) {
        this.s = s;
        this.p = p;
        this.graph = graph;
        this.termFactory = termFactory;
        this.NS_Rdf = NS_RDF;
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
//# sourceMappingURL=list-object.js.map

var ShexToUiForm = /** @class */ (function () {
    function ShexToUiForm(schema) {
        this.termFactory = N3.DataFactory;
        this.graph = new N3.Store();
        this.meta = { prefixes: schema._prefixes, base: window.location.href };
        this.iriRdftype = NS_RDF + "type";
        this.iriDctitle = NS_DC + "title";
        this.iriUitype = this.iriRdftype;
        this.schema = schema;
    }
    /**
     * Convert SheEx to Form Model
     */
    ShexToUiForm.prototype.convert = function () {
        var _a = this, schema = _a.schema, graph = _a.graph, _b = _a.termFactory, namedNode = _b.namedNode, blankNode = _b.blankNode, literal = _b.literal;
        var IRI_this = '#';
        var rootFormTerm = namedNode(IRI_this + "formRoot");
        console.log(graph);
        var start = 'start' in this.schema ? this.derefShapeExpression(schema.start) : schema.shapes[0];
        this.walkShape(start, rootFormTerm, this.localName(start.id), namedNode, literal, blankNode);
        var writer = new N3.Writer({
            prefixes: { '': IRI_this, ui: NS_UI, dc: NS_DC },
            listHeads: graph.sequesterLists()
        });
        writer.addQuads(graph.getQuads());
        var formModel;
        writer.end(function (error, result) { return (formModel = result); });
        return formModel;
    };
    ShexToUiForm.prototype.findTitle = function (shexpr) {
        var _this = this;
        return (shexpr.annotations || []).find(function (a) { return a.predicate === _this.iriDctitle; });
    };
    ShexToUiForm.prototype.localName = function (iri) {
        var meta = this.meta;
        if (iri.startsWith('_:')) {
            return iri;
        }
        var prefix = Object.keys(meta.prefixes).find(function (p) { return iri.startsWith(meta.prefixes[p]); });
        if (prefix) {
            return prefix + (":" + iri.substr(meta[prefix].length));
        }
        return "<" + (iri.startsWith(meta.base) ? iri.substr(meta.base.length) : iri) + ">";
    };
    ShexToUiForm.prototype.derefShapeExpression = function (shapeExpr) {
        if (typeof shapeExpr !== 'string') {
            return shapeExpr;
        }
        var ret = this.findShapeExpression(shapeExpr);
        if (!ret) {
            throw Error("unable to find shape expression \"" + shapeExpr + "\" in \n            " + this.schema.shapes.map(function (se) { return se.id; }).join('\n'));
        }
        return ret;
    };
    /**
     * Find shape expression with given name in schema.
     * returns: corresponding shape expression or undefined
     */
    ShexToUiForm.prototype.findShapeExpression = function (goal) {
        return this.schema.shapes.find(function (se) { return se.id === goal; });
    };
    ShexToUiForm.prototype.walkShape = function (shape, formTerm, path, namedNode, literal, blankNode) {
        var _this = this;
        try {
            var graph_1 = this.graph;
            var sanitizedPath_1 = path.replace(/[^A-Za-z_-]/g, '_');
            var label = this.findTitle(shape);
            graph_1.addQuad(formTerm, namedNode(NS_RDF + "type"), namedNode(NS_UI + "Form"));
            if (label) {
                graph_1.addQuad(formTerm, namedNode(this.iriDctitle), literal(label.object.value));
            }
            var currentShape = shape;
            if (!('expression' in shape) || shape.expression.type !== 'EachOf') {
                currentShape = __assign({}, currentShape, { expression: { expressions: [currentShape.expression] } });
            }
            // The UI vocabulary accepts only lists of atoms.
            var parts_1 = new ListObject(formTerm, namedNode(NS_UI + "parts"), graph_1, this.termFactory);
            if (currentShape && currentShape.expression && currentShape.expression.expressions) {
                currentShape.expression.expressions.forEach(function (te, i) {
                    var tePath = path + "/[" + i + "]";
                    if (te.type !== 'TripleConstraint') {
                        throw Error("expected " + tePath + " of type TripleConstraint, got: " + JSON.stringify(te));
                    }
                    var fieldTerm = 'id' in te ? _this.jsonLdtoRdf(te.id) : blankNode(sanitizedPath_1 + "_parts_" + i + "_field");
                    var fieldType = te.valueExpr && te.valueExpr.values ? 'Classifier' : 'SingleLineTextField';
                    var needFieldType = namedNode(NS_UI + fieldType);
                    // copy annotations
                    if ('annotations' in te)
                        te.annotations.forEach(function (a) {
                            if (a.predicate === NS_LAYOUT + "ref") {
                                return;
                            }
                            if (a.predicate === _this.iriRdftype) {
                                needFieldType = null;
                            }
                            if (a.predicate === NS_UI + "contents") {
                                // ui:contents get their own item in the list
                                var commentTerm = 'id' in te
                                    ? _this.jsonLdtoRdf(te.id + "Comment") // !! could collide, but easy to debug
                                    : blankNode(sanitizedPath_1 + "_parts_" + i + "_comment");
                                graph_1.addQuad(commentTerm, namedNode(_this.iriUitype), namedNode(NS_UI + "Comment"));
                                graph_1.addQuad(commentTerm, namedNode(NS_UI + "contents"), _this.jsonLdtoRdf(a.object));
                                // add the parts list entry for comment
                                parts_1.add(commentTerm, sanitizedPath_1 + "_parts_" + i + "_comment");
                            }
                            else if (a.predicate.includes('label')) {
                                graph_1.addQuad(fieldTerm, namedNode(NS_UI + "label"), _this.jsonLdtoRdf(a.object));
                            }
                            else {
                                graph_1.addQuad(fieldTerm, _this.jsonLdtoRdf(a.predicate), _this.jsonLdtoRdf(a.object));
                            }
                        });
                    // add the parts list entry for new field
                    parts_1.add(fieldTerm, sanitizedPath_1 + "_parts_" + i);
                    // add property arc
                    graph_1.addQuad(fieldTerm, namedNode(NS_UI + "property"), _this.jsonLdtoRdf(te.predicate));
                    var valueExpr = typeof te.valueExpr === 'string'
                        ? _this.derefShapeExpression(te.valueExpr)
                        : te.valueExpr;
                    // add what we can guess from the value expression
                    if (valueExpr.type === 'Shape') {
                        needFieldType = null;
                        var groupId = blankNode(sanitizedPath_1 + "_parts_" + i + "_group");
                        graph_1.addQuad(fieldTerm, _this.iriRdftype, namedNode(NS_UI + "Multiple"));
                        graph_1.addQuad(fieldTerm, namedNode(NS_UI + "part"), groupId);
                        _this.walkShape(valueExpr, groupId, path + "/@" + _this.localName(te.valueExpr), namedNode, literal, blankNode);
                    }
                    else if (valueExpr.type === 'NodeConstraint') {
                        var nc = valueExpr;
                        if ('maxlength' in nc) {
                            graph_1.addQuad(fieldTerm, namedNode(NS_UI + "maxLength"), _this.jsonLdtoRdf({ value: nc.maxlength }));
                        }
                        if ('pattern' in nc) {
                            graph_1.addQuad(fieldTerm, namedNode(NS_UI + "pattern"), _this.jsonLdtoRdf({ value: nc.pattern }));
                        }
                    }
                    else {
                        throw Error("Unsupported value expression on " + tePath + ": " + JSON.stringify(valueExpr));
                    }
                    // if there's no type, assume ui:SingleLineTextField
                    if (needFieldType) {
                        graph_1.addQuad(fieldTerm, namedNode(_this.iriRdftype), needFieldType);
                    }
                });
            }
            parts_1.end();
        }
        catch (error) {
            throw Error(error);
        }
    };
    ShexToUiForm.prototype.jsonLdtoRdf = function (ld) {
        var _a = this.termFactory, namedNode = _a.namedNode, literal = _a.literal, blankNode = _a.blankNode;
        if (typeof ld === 'object' && 'value' in ld) {
            var dtOrLang = ld.language || (ld.datatype && ld.datatype !== IRI_XsdString)
                ? ld.language
                : namedNode(ld.datatype);
            return literal(ld.value, dtOrLang);
        }
        else if (ld.startsWith('_:')) {
            return blankNode(ld.substr(2));
        }
        else {
            return namedNode(ld);
        }
    };
    return ShexToUiForm;
}());

var FormModel = /** @class */ (function () {
    function FormModel(url) {
        var _this = this;
        /**
         * @param {String} url the schema document url
         * @return {String} document extension
         */
        this.schemaType = function (url) {
            var name = url.split('.');
            return name[name.length - 1];
        };
        /**
         *
         * @param {String} schemaText the document content
         * @param {String} document url
         */
        this.parseShexC = function (schemaText, url) {
            try {
                var parser = shexParser.construct(url, null, { index: true });
                return parser.parse(schemaText);
            }
            catch (error) {
                throw Error(error);
            }
        };
        this.parseTurtle = function (schemaText, url) {
            try {
                var graph = new N3.Store();
                var parser = new N3.Parser({
                    format: 'application/turtle',
                    baseIRI: url
                });
                graph.addQuads(parser.parse(schemaText));
                var shexRSchemaObj = shexParser.construct(url, null, { index: true }).parse(ShExRSchema);
                var graphParser = shexCore.Validator.construct(shexRSchemaObj, {});
                var schemaRoot = graph.getQuads(null, shexCore.Util.RDF.type, 'http://www.w3.org/ns/shex#Schema', '')[0].subject; // !!check
                var val = graphParser.validate(shexCore.Util.makeN3DB(graph), schemaRoot, shexCore.Validator.start); // start shape
                return shexCore.Util.ShExRtoShExJ(shexCore.Util.valuesToSchema(shexCore.Util.valToValues(val)));
            }
            catch (error) {
                throw Error(error);
            }
        };
        this.parseSchema = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var schemaText, format, schema, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchSchema(url)];
                    case 1:
                        schemaText = _a.sent();
                        format = this.schemaType(url);
                        schema = void 0;
                        switch (format.toLowerCase()) {
                            case 'shex':
                                schema = this.parseShexC(schemaText, url);
                                break;
                            case 'ttl':
                                schema = this.parseTurtle(schemaText, url);
                                break;
                            case 'json':
                                schema = this.parseShexJ(schemaText, url);
                                break;
                            default:
                                throw new Error('File not supported.');
                        }
                        return [2 /*return*/, schema];
                    case 2:
                        error_1 = _a.sent();
                        throw Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.parseShexJ = function (schemaText, url) {
            try {
                return _this.relativeize(JSON.parse(schemaText), url);
            }
            catch (error) {
                throw Error(error);
            }
        };
        this.parseSchemaToUi = function () { return __awaiter(_this, void 0, void 0, function () {
            var schema, formModel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parseSchema(this.url)];
                    case 1:
                        schema = _a.sent();
                        formModel = new ShexToUiForm(schema);
                        console.log(formModel);
                        return [2 /*return*/, formModel.convert()];
                    case 2:
                        error_2 = _a.sent();
                        throw Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.relativeize = function (object, base) {
            for (var key in object) {
                var item = object[key];
                if (key === 'id' || (key === 'valueExpr' && typeof object[key] === 'string')) {
                    object[key] = new URL(object[key], base).href;
                }
                else if (typeof item === 'object') {
                    _this.relativeize(item, base);
                }
            }
            return object;
        };
        this.url = url;
    }
    return FormModel;
}());

export { FormModel, ShexToUiForm };
//# sourceMappingURL=solid-forms.es5.js.map
