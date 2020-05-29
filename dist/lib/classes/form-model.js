"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("@shexjs/parser");
var core_1 = require("@shexjs/core");
var N3 = require("n3");
var _schemas_1 = require("@schemas");
var _utils_1 = require("@utils");
var _constants_1 = require("@constants");
var shex_form_model_1 = require("./shex-form-model");
var FormModel = /** @class */ (function () {
    function FormModel(url, documentUri) {
        var _this = this;
        this.url = url;
        this.documentUri = documentUri;
        /**
         * @param {String} url The URL of the shape or schema
         * @return {String} document extension
         */
        this.schemaType = function (url) {
            var name = url && url.split('.');
            return name[name.length - 1];
        };
        /**
         *
         * @param {String} schemaText The Shape Schema
         * @param {String} document The Document Url
         */
        this.parseShexC = function (schemaText, url) {
            try {
                var parser = parser_1.default.construct(url, null, { index: true });
                return parser.parse(schemaText);
            }
            catch (error) {
                throw Error(error);
            }
        };
        /**
         * Convert ShEx to Turtle object
         * We are using n3 library fro more information please go to: https://github.com/rdfjs/N3.js
         */
        this.parseTurtle = function (schemaText, url) {
            try {
                /**
                 * N3.Store allows you to store triples in memory and find them fast.
                 */
                var graph = new N3.Store();
                /**
                 * N3.Parser transforms Turtle, TriG, N-Triples, or N-Quads document into quads through a callback
                 */
                var parser = new N3.Parser({
                    format: 'application/turtle',
                    baseIRI: url
                });
                /**
                 * Insert an array of quads
                 */
                graph.addQuads(parser.parse(schemaText));
                var shexRSchemaObj = parser_1.default.construct(url, null, { index: true }).parse(_schemas_1.ShExRSchema);
                var graphParser = core_1.default.Validator.construct(shexRSchemaObj, {});
                /**
                 * Insert an array of quads
                 */
                var schemaRoot = graph.getQuads(null, core_1.default.Util.RDF.type, _constants_1.SHEX_SCHEMA, '')[0].subject; // !!check
                var val = graphParser.validate(core_1.default.Util.makeN3DB(graph), schemaRoot, core_1.default.Validator.start);
                /**
                 * Convert ShEx to ShExJ
                 */
                return core_1.default.Util.ShExRtoShExJ(core_1.default.Util.valuesToSchema(core_1.default.Util.valToValues(val)));
            }
            catch (error) {
                throw Error(error);
            }
        };
        /**
         * Parse schema from shEx, turtle or json files
         */
        this.parseSchema = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var schemaText, format, schema, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _utils_1.solidFetch.fetchSchema(url)];
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
                return _this.normalize(JSON.parse(schemaText), url);
            }
            catch (error) {
                throw Error(error);
            }
        };
        /**
         * Parse Schema to Schema object
         */
        this.normalize = function (object, base) {
            for (var key in object) {
                var item = object[key];
                if (key === 'id' || (key === 'valueExpr' && typeof object[key] === 'string')) {
                    object[key] = new URL(object[key], base).href;
                }
                else if (typeof item === 'object') {
                    _this.normalize(item, base);
                }
            }
            return object;
        };
        /**
         * Parse schema to Form Model
         */
        this.parseShEx = function () { return __awaiter(_this, void 0, void 0, function () {
            var schema, formModel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.parseSchema(this.url)];
                    case 1:
                        schema = _a.sent();
                        formModel = new shex_form_model_1.ShexFormModel(schema, this.documentUri);
                        return [2 /*return*/, formModel.convert()];
                    case 2:
                        error_2 = _a.sent();
                        throw Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return FormModel;
}());
exports.FormModel = FormModel;
//# sourceMappingURL=form-model.js.map