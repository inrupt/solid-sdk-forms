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
var _constants_1 = require("@constants");
var list_object_1 = require("./list-object");
var data_model_1 = require("@rdfjs/data-model");
/**
 * Convert ShEx to Form Model
 * We are using n3 library for more info please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
 */
var ShexFormModel = /** @class */ (function () {
    function ShexFormModel(schema, documentUri) {
        this.schema = schema;
        this.documentUri = documentUri;
        this.termFactory = n3_1.DataFactory;
        this.graph = new n3_1.Store();
        this.meta = { prefixes: schema._prefixes, base: window.location.href };
        this.iriRdftype = _constants_1.NS_RDF + "type";
        this.iriDctitle = _constants_1.NS_DC + "title";
        this.iriUitype = this.iriRdftype;
    }
    ShexFormModel.prototype.getSubjectNode = function (term) {
        return data_model_1.namedNode("#" + term);
    };
    /**
     * Add the right constraint depending on the expression DataType or Explicit constraint.
     * We are using the CONSTANTS to get the right constraint.
     * @param fieldTerm to pass the right ID to the node.
     * @param exp Expression to get the Explicit Constraint.
     * @returns This Function does not have any returns it adds the UI Constraint or not.
     */
    ShexFormModel.prototype.getNumberConstraint = function (exp, fieldTerm) {
        if (exp === void 0) { exp = {}; }
        var type = exp.datatype && exp.datatype.split('#')[1];
        var maxValue;
        var minValue;
        /**
         * Find if there is an Explicit constraint or not.
         */
        if (exp.mininclusive || exp.maxinclusive) {
            maxValue = exp.maxinclusive && exp.maxinclusive;
            minValue = exp.mininclusive && exp.mininclusive;
        }
        else {
            // Not all numeric types have both a max and min value. For example  non-negative constraints would only
            // be a minValue. This block checks if there's a max or min value for the given field type and only sets
            // the appropriate fields for that numeric data type
            maxValue = _constants_1.CONSTRAINTS[type] && _constants_1.CONSTRAINTS[type].maxValue && +_constants_1.CONSTRAINTS[type].maxValue;
            minValue = _constants_1.CONSTRAINTS[type] && _constants_1.CONSTRAINTS[type].minValue && +_constants_1.CONSTRAINTS[type].minValue;
        }
        /**
         * Check if there is a number or undefined to add or not the UI:Constraint.
         * The value can be 0
         */
        isNaN(maxValue)
            ? false
            : this.graph.addQuad(this.getSubjectNode(fieldTerm.id), data_model_1.namedNode(_constants_1.NS_UI + "maxValue"), this.jsonLdtoRdf({ value: maxValue }));
        isNaN(minValue)
            ? false
            : this.graph.addQuad(this.getSubjectNode(fieldTerm.id), data_model_1.namedNode(_constants_1.NS_UI + "minValue"), this.jsonLdtoRdf({ value: minValue }));
    };
    ShexFormModel.prototype.getFieldType = function (exp) {
        if (exp === void 0) { exp = {}; }
        /**
         * Check if field has values this mean that will be a Classifier
         */
        if (exp.values) {
            return 'Classifier';
        }
        /**
         * By default if not has dataType we will use text field
         */
        if (exp.datatype && !exp.datatype.includes('#')) {
            return 'SingleLineTextField';
        }
        /**
         * Get type from type prefix
         */
        var type = exp.datatype && exp.datatype.split('#')[1];
        switch (type) {
            case 'date':
                return 'DateField';
            case 'datetime':
                return 'DateTimeField';
            case 'time':
                return 'TimeField';
            case 'boolean':
                return 'BooleanField';
            case 'integer':
                return 'IntegerField';
            case 'decimal':
                return 'DecimalField';
            case 'float':
                return 'FloatField';
            case 'double':
                return 'FloatField';
            case 'nonPositiveInteger':
                return 'IntegerField';
            case 'negativeInteger':
                return 'IntegerField';
            case 'long':
                return 'IntegerField';
            case 'short':
                return 'IntegerField';
            case 'byte':
                return 'IntegerField';
            case 'nonNegativeInteger':
                return 'IntegerField';
            case 'unsignedLong':
                return 'IntegerField';
            case 'unsignedInt':
                return 'IntegerField';
            case 'unsignedShort':
                return 'IntegerField';
            case 'unsignedByte':
                return 'IntegerField';
            case 'positiveInteger':
                return 'IntegerField';
            default:
                // If we have a text field, with a maxlength of a certain value, change to a textarea
                if (exp.maxlength && exp.maxlength > 100) {
                    return 'MultiLineTextField';
                }
                else {
                    return 'SingleLineTextField';
                }
        }
    };
    /**
     * Convert SheEx to Form Model
     */
    ShexFormModel.prototype.convert = function () {
        var _a = this, schema = _a.schema, _b = _a.termFactory, namedNode = _b.namedNode, blankNode = _b.blankNode, literal = _b.literal;
        var IRI_THIS = '#';
        /**
         * Get root for term into ShexEx
         */
        var rootFormTerm = namedNode(IRI_THIS + "formRoot");
        /**
         * Find ShEx expression
         */
        var start = 'start' in this.schema ? this.derefShapeExpression(schema.start) : schema.shapes[0];
        /**
         * Traverse the shape to create turtle object
         */
        this.walkShape(start, rootFormTerm, this.localName(start.id));
        var writer = new n3_1.Writer({
            prefixes: { '': IRI_THIS, ui: _constants_1.NS_UI, dc: _constants_1.NS_DC },
            lists: this.graph.extractLists({ remove: true })
        });
        writer.addQuads(this.graph.getQuads());
        var formModel;
        // tslint:disable-next-line:handle-callback-err
        writer.end(function (error, result) { return (formModel = result); });
        return formModel;
    };
    /**
     * Find label expression into ShEx
     * @param shexpr
     */
    ShexFormModel.prototype.findTitle = function (shexpr) {
        var _this = this;
        return (shexpr.annotations || []).find(function (a) { return a.predicate === _this.iriDctitle; });
    };
    /**
     * Define shape type into Form Model
     * @param iri
     */
    ShexFormModel.prototype.localName = function (iri) {
        var meta = this.meta;
        /**
         * If iri has _: already has the type format
         */
        if (iri.startsWith('_:')) {
            return iri;
        }
        var prefix = Object.keys(meta.prefixes).find(function (p) { return iri.startsWith(meta.prefixes[p]); });
        /**
         * Create iri type using string format <>
         */
        if (prefix) {
            return prefix + (":" + iri.substr(meta[prefix].length));
        }
        /**
         * Return the type string
         */
        return "<" + (iri.startsWith(meta.base) ? iri.substr(meta.base.length) : iri) + ">";
    };
    /**
     *
     * @param shapeExpr
     */
    ShexFormModel.prototype.derefShapeExpression = function (shapeExpr) {
        if (typeof shapeExpr !== 'string') {
            return shapeExpr;
        }
        var ret = this.findShapeExpression(shapeExpr);
        if (!ret) {
            throw Error("unable to find shape expression \"" + shapeExpr + "\" in\n            " + this.schema.shapes.map(function (se) { return se.id; }).join('\n'));
        }
        return ret;
    };
    /**
     * Find shape expression with given name in schema.
     * returns: corresponding shape expression or undefined
     * @param {string} goal expression to find
     */
    ShexFormModel.prototype.findShapeExpression = function (goal) {
        return this.schema.shapes.find(function (se) { return se.id === goal; });
    };
    /**
     * Checks if the expression is a Classifier (a dropdown)
     * @param expression
     */
    ShexFormModel.prototype.findShapeExpressionOptions = function (expression) {
        /**
         * In case it is not a Classifies it will ignore it
         */
        if (typeof expression === 'string' &&
            typeof this.findShapeExpression(expression) === 'string') {
            return null;
        }
        /**
         * Validates the {values} field in the expression to confirm it is a Classifier/dropdown
         */
        if (expression && expression.values) {
            var values = expression.values;
            return { type: 'Classifier', values: values.map(function (value) { return value.value || value; }) };
        }
        return null;
    };
    /**
     * Traverse the shape and create the object with turtle format
     * @param shape
     * @param formTerm
     * @param path
     * @param isGroup
     */
    ShexFormModel.prototype.walkShape = function (shape, formTerm, path, isGroup) {
        var _this = this;
        if (isGroup === void 0) { isGroup = false; }
        try {
            var graph_1 = this.graph;
            var sanitizedPath_1 = path
                .substr(path.lastIndexOf('/'), path.length)
                .replace(/[^A-Za-z_-]/g, '_');
            var label = this.findTitle(shape);
            var _a = this.termFactory, literal = _a.literal, namedNode_1 = _a.namedNode, blankNode_1 = _a.blankNode;
            var type = isGroup ? 'Group' : 'Form';
            /**
             * insert one quad into n3 store
             */
            graph_1.addQuad(formTerm, namedNode_1(_constants_1.NS_RDF + "type"), namedNode_1("" + _constants_1.NS_UI + type));
            if (label) {
                /**
                 * insert one quad into n3 store
                 */
                graph_1.addQuad(formTerm, namedNode_1(this.iriDctitle), literal(label.object.value));
            }
            var currentShape = shape;
            if (!('expression' in shape) || shape.expression.type !== _constants_1.EACH_OF) {
                currentShape = __assign({}, currentShape, { expression: { expressions: [currentShape.expression] } });
            }
            // The UI vocabulary accepts only lists of atoms.
            var parts_1 = new list_object_1.ListObject(formTerm, namedNode_1(_constants_1.NS_UI + "parts"), graph_1, this.termFactory);
            if (currentShape && currentShape.expression && currentShape.expression.expressions) {
                currentShape.expression.expressions.forEach(function (te, i) {
                    var tePath = path + "/[" + i + "]";
                    if (te.type !== _constants_1.TRIPLE_CONSTRAINT) {
                        throw Error("expected " + tePath + " of type " + _constants_1.TRIPLE_CONSTRAINT + ", got: " + JSON.stringify(te));
                    }
                    var fieldTerm = 'id' in te ? _this.jsonLdtoRdf(te.id) : blankNode_1(sanitizedPath_1 + "_parts_" + i);
                    var optionsType = _this.findShapeExpressionOptions(te.valueExpr);
                    var fieldType = _this.getFieldType(te.valueExpr);
                    if (optionsType) {
                        var type_1 = optionsType.type;
                        fieldType = type_1;
                    }
                    var needFieldType = namedNode_1(_constants_1.NS_UI + fieldType);
                    // copy annotations
                    if ('annotations' in te) {
                        te.annotations.forEach(function (a) {
                            if (a.predicate === _constants_1.NS_LAYOUT + "ref") {
                                return;
                            }
                            if (a.predicate === _this.iriRdftype) {
                                needFieldType = null;
                            }
                            if (a.predicate === _constants_1.NS_UI + "contents") {
                                // ui:contents get their own item in the list
                                var commentTerm = 'id' in te
                                    ? _this.jsonLdtoRdf(te.id + "Comment") // !! could collide, but easy to debug
                                    : blankNode_1(sanitizedPath_1 + "_parts_" + i + "_comment");
                                /**
                                 * insert one quad into n3 store
                                 */
                                graph_1.addQuad(commentTerm, namedNode_1(_this.iriUitype), namedNode_1(_constants_1.NS_UI + "Comment"));
                                graph_1.addQuad(commentTerm, namedNode_1(_constants_1.NS_UI + "contents"), _this.jsonLdtoRdf(a.object));
                                // add the parts list entry for comment
                                parts_1.add(commentTerm, sanitizedPath_1 + "_parts_" + i + "_comment");
                            }
                            else if (a && a.predicate && a.predicate.includes('label')) {
                                /**
                                 * insert one quad into n3 store
                                 */
                                graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_constants_1.NS_UI + "label"), _this.jsonLdtoRdf(a.object));
                            }
                            else {
                                /**
                                 * insert one quad into n3 store
                                 */
                                graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), _this.jsonLdtoRdf(a.predicate), _this.jsonLdtoRdf(a.object));
                            }
                        });
                    }
                    // add the parts list entry for new field
                    parts_1.add("#_:" + sanitizedPath_1 + "_parts_" + i);
                    // add property arc
                    graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_constants_1.NS_UI + "property"), _this.jsonLdtoRdf(te.predicate));
                    var valueExpr = typeof te.valueExpr === 'string'
                        ? _this.derefShapeExpression(te.valueExpr)
                        : te.valueExpr;
                    // add what we can guess from the value expression
                    if (valueExpr.type === 'Shape') {
                        needFieldType = null;
                        var groupId = namedNode_1("#" + sanitizedPath_1 + "_parts_" + i + "_group");
                        graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), _this.iriRdftype, namedNode_1(_constants_1.NS_UI + "Multiple"));
                        /**
                         * Adding a Single Part
                         */
                        graph_1.addQuad("#" + fieldTerm.id, namedNode_1(_constants_1.NS_UI + "part"), _this.jsonLdtoRdf("#" + sanitizedPath_1 + "_parts_" + i + "_group"));
                        _this.walkShape(valueExpr, groupId, path + "/@" + _this.localName(te.valueExpr), true);
                    }
                    else if (valueExpr.type === _constants_1.NODE_CONSTRAINT) {
                        var nc = valueExpr;
                        if ('maxlength' in nc) {
                            graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_constants_1.NS_UI + "maxLength"), _this.jsonLdtoRdf({ value: nc.maxlength }));
                        }
                        if ('pattern' in nc) {
                            graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_constants_1.NS_UI + "pattern"), _this.jsonLdtoRdf({ value: nc.pattern }));
                        }
                        _this.getNumberConstraint(valueExpr, fieldTerm);
                    }
                    else {
                        throw Error("Unsupported value expression on " + tePath + ": " + JSON.stringify(valueExpr));
                    }
                    // if there's no type, assume ui:SingleLineTextField
                    if (needFieldType) {
                        graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_this.iriRdftype), needFieldType);
                    }
                    /**
                     * Add Boolean and Classifier options
                     */
                    if (optionsType) {
                        if (optionsType.type === 'BooleanField') {
                            graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(_constants_1.NS_UI + "default"), _this.jsonLdtoRdf({ value: '0' }));
                        }
                        else if (optionsType.type === 'Classifier') {
                            if (optionsType.values) {
                                var classifierParts = new list_object_1.ListObject("#" + fieldTerm.id, namedNode_1(_constants_1.NS_UI + "values"), graph_1, _this.termFactory);
                                for (var _i = 0, _a = optionsType.values; _i < _a.length; _i++) {
                                    var value = _a[_i];
                                    classifierParts.add("\"" + value + "\"");
                                }
                                classifierParts.end();
                            }
                        }
                    }
                });
            }
            parts_1.end();
        }
        catch (error) {
            throw Error(error);
        }
    };
    /**
     * Convert jsonLd object to RDF object
     * @param ld
     */
    ShexFormModel.prototype.jsonLdtoRdf = function (ld) {
        var _a = this.termFactory, namedNode = _a.namedNode, literal = _a.literal, blankNode = _a.blankNode;
        if (typeof ld === 'object' && 'value' in ld) {
            var dtOrLang = ld.language || (ld.datatype && ld.datatype !== _constants_1.IRI_XsdString)
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
    return ShexFormModel;
}());
exports.ShexFormModel = ShexFormModel;
//# sourceMappingURL=shex-form-model.js.map