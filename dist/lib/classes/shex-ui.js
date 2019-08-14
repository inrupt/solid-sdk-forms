"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var n3_1 = require("n3");
var constants_1 = require("../constants");
var list_object_1 = require("./list-object");
var ShexToUiForm = /** @class */ (function () {
    function ShexToUiForm(schema) {
        this.termFactory = n3_1.default.DataFactory;
        this.graph = new n3_1.default.Store();
        this.meta = { prefixes: schema._prefixes, base: window.location.href };
        this.iriRdftype = constants_1.NS_RDF + "type";
        this.iriDctitle = constants_1.NS_DC + "title";
        this.iriUitype = this.iriRdftype;
        this.schema = schema;
    }
    /**
     * Convert SheEx to Form Model
     */
    ShexToUiForm.prototype.convert = function () {
        var _a = this, schema = _a.schema, _b = _a.termFactory, namedNode = _b.namedNode, blankNode = _b.blankNode, literal = _b.literal, graph = _b.graph;
        var IRI_this = '#';
        var rootFormTerm = namedNode(IRI_this + "formRoot");
        var start = 'start' in this.schema ? this.derefShapeExpression(schema.start) : schema.shapes[0];
        this.walkShape(start, rootFormTerm, this.localName(start.id), namedNode, literal, blankNode);
        var writer = new n3_1.default.Writer({
            prefixes: { '': IRI_this, ui: constants_1.NS_UI, dc: constants_1.NS_DC },
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
            graph_1.addQuad(formTerm, namedNode(constants_1.NS_RDF + "type"), namedNode(constants_1.NS_UI + "Form"));
            var label = this.findTitle(shape);
            if (label)
                graph_1.addQuad(formTerm, namedNode(this.iriDctitle), literal(label.object.value));
            var currentShape = shape;
            if (!('expression' in shape) || shape.expression.type !== 'EachOf') {
                currentShape = __assign({}, currentShape, { expression: { expressions: [currentShape.expression] } });
            }
            // The UI vocabulary accepts only lists of atoms.
            var parts_1 = new list_object_1.ListObject(formTerm, namedNode(constants_1.NS_UI + "parts"), graph_1, this.termFactory);
            if (currentShape && currentShape.expression && currentShape.expression.expressions) {
                currentShape.expression.expressions.forEach(function (te, i) {
                    var tePath = path + "/[" + i + "]";
                    if (te.type !== 'TripleConstraint') {
                        throw Error("expected " + tePath + " of type TripleConstraint, got: " + JSON.stringify(te));
                    }
                    var fieldTerm = 'id' in te ? _this.jsonLdtoRdf(te.id) : blankNode(sanitizedPath_1 + "_parts_" + i + "_field");
                    var fieldType = te.valueExpr && te.valueExpr.values ? 'Classifier' : 'SingleLineTextField';
                    var needFieldType = namedNode(constants_1.NS_UI + fieldType);
                    // copy annotations
                    if ('annotations' in te)
                        te.annotations.forEach(function (a) {
                            if (a.predicate === constants_1.NS_LAYOUT + "ref") {
                                return;
                            }
                            if (a.predicate === _this.iriRdftype) {
                                needFieldType = null;
                            }
                            if (a.predicate === constants_1.NS_UI + "contents") {
                                // ui:contents get their own item in the list
                                var commentTerm = 'id' in te
                                    ? _this.jsonLdtoRdf(te.id + "Comment") // !! could collide, but easy to debug
                                    : blankNode(sanitizedPath_1 + "_parts_" + i + "_comment");
                                graph_1.addQuad(commentTerm, namedNode(_this.iriUitype), namedNode(constants_1.NS_UI + "Comment"));
                                graph_1.addQuad(commentTerm, namedNode(constants_1.NS_UI + "contents"), _this.jsonLdtoRdf(a.object));
                                // add the parts list entry for comment
                                parts_1.add(commentTerm, sanitizedPath_1 + "_parts_" + i + "_comment");
                            }
                            else if (a.predicate.includes('label')) {
                                graph_1.addQuad(fieldTerm, namedNode(constants_1.NS_UI + "label"), _this.jsonLdtoRdf(a.object));
                            }
                            else {
                                graph_1.addQuad(fieldTerm, _this.jsonLdtoRdf(a.predicate), _this.jsonLdtoRdf(a.object));
                            }
                        });
                    // add the parts list entry for new field
                    parts_1.add(fieldTerm, sanitizedPath_1 + "_parts_" + i);
                    // add property arc
                    graph_1.addQuad(fieldTerm, namedNode(constants_1.NS_UI + "property"), _this.jsonLdtoRdf(te.predicate));
                    var valueExpr = typeof te.valueExpr === 'string'
                        ? _this.derefShapeExpression(te.valueExpr)
                        : te.valueExpr;
                    // add what we can guess from the value expression
                    if (valueExpr.type === 'Shape') {
                        needFieldType = null;
                        var groupId = blankNode(sanitizedPath_1 + "_parts_" + i + "_group");
                        graph_1.addQuad(fieldTerm, _this.iriRdftype, namedNode(constants_1.NS_UI + "Multiple"));
                        graph_1.addQuad(fieldTerm, namedNode(constants_1.NS_UI + "part"), groupId);
                        _this.walkShape(valueExpr, groupId, path + "/@" + _this.localName(te.valueExpr), namedNode, literal, blankNode);
                    }
                    else if (valueExpr.type === 'NodeConstraint') {
                        var nc = valueExpr;
                        if ('maxlength' in nc) {
                            graph_1.addQuad(fieldTerm, namedNode(constants_1.NS_UI + "maxLength"), _this.jsonLdtoRdf({ value: nc.maxlength }));
                        }
                        if ('pattern' in nc) {
                            graph_1.addQuad(fieldTerm, namedNode(constants_1.NS_UI + "pattern"), _this.jsonLdtoRdf({ value: nc.pattern }));
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
            var dtOrLang = ld.language || (ld.datatype && ld.datatype !== constants_1.IRI_XsdString)
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
exports.ShexToUiForm = ShexToUiForm;
//# sourceMappingURL=shex-ui.js.map