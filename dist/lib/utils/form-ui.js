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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_ldflex_1 = require("@solid/query-ldflex");
var uuid_1 = require("uuid");
var _constants_1 = require("@constants");
var lodash_1 = require("lodash");
/**
 * Find prefix context to add into object property
 * @param node
 */
function findContext(node) {
    var contexts = Object.keys(_constants_1.CONTEXT['@context']);
    var prefix = '';
    for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
        var context = contexts_1[_i];
        if (node.includes(_constants_1.CONTEXT['@context'][context])) {
            prefix = context + ":";
            return prefix;
        }
    }
    return prefix;
}
/**
 * Capitalize words into string
 * @param word
 */
function capitalize(word) {
    return word.replace(/(?:^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
}
/**
 * Get Label from external sources
 * @param property
 */
function findLabel(property) {
    return __awaiter(this, void 0, void 0, function () {
        var vocabDoc, vocabLabel, label;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(property && property.includes('#'))) return [3 /*break*/, 2];
                    vocabDoc = getFetchUrl(property.split('#')[0]);
                    return [4 /*yield*/, query_ldflex_1.default.from(vocabDoc)[property].label];
                case 1:
                    vocabLabel = _a.sent();
                    if (vocabLabel && vocabLabel.value) {
                        return [2 /*return*/, vocabLabel.value];
                    }
                    else {
                        label = property.split('#')[1];
                        return [2 /*return*/, capitalize(label.replace(/[^a-zA-Z ]/g, ' '))];
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/, 'noLabel'];
            }
        });
    });
}
/**
 * Return a version of the property that includes https, to work around https/http mismatched domains
 * This is applicable for a few select vocabularies, including
 * @param property
 */
function getFetchUrl(property) {
    if (property && property.includes('http')) {
        var newUrl = new URL(property);
        return 'https://' + newUrl.hostname + newUrl.pathname;
    }
    else {
        return property;
    }
}
/**
 * Get Predicate name from string
 * @param predicate
 */
function getPredicateName(predicate) {
    var prefix = findContext(predicate);
    if (predicate.includes('title')) {
        return prefix + "title";
    }
    if (predicate.includes('#')) {
        return "" + prefix + predicate.split('#')[1];
    }
    if (predicate.lastIndexOf('ui:')) {
        return "" + prefix + predicate.split('ui:')[1];
    }
    return null;
}
/**
 * Fetch a value for a given subject and property, with special considerations for specific properties
 * The fetch will look for language strings first and if no language is available it will fall back to the non-language string
 * It also calls loopList for ui#values, which is a dropdown, and concerts the rdf list into a JS array
 * @param field
 * @param property
 * @param lang
 */
function getPropertyValue(field, property, lang) {
    if (lang === void 0) { lang = 'en'; }
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var propertyProxy, updatedProperty, textValue, _b, _c, text, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    updatedProperty = changeHostProtocol(field);
                    if (!(property === _constants_1.NS.UI.Label || property === _constants_1.NS.UI.Contents)) return [3 /*break*/, 13];
                    textValue = '';
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(query_ldflex_1.default.from(updatedProperty)[field][property]);
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    text = _c.value;
                    if (text && text.language === lang) {
                        textValue = text.value;
                    }
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    if (textValue)
                        return [2 /*return*/, textValue];
                    return [3 /*break*/, 14];
                case 13:
                    if (property.includes('ui#values')) {
                        return [2 /*return*/, loopList(query_ldflex_1.default.from(updatedProperty)[field][property])];
                    }
                    _d.label = 14;
                case 14: return [4 /*yield*/, query_ldflex_1.default.from(updatedProperty)[field][property]];
                case 15:
                    propertyProxy = _d.sent();
                    return [2 /*return*/, propertyProxy && propertyProxy.value];
            }
        });
    });
}
function changeHostProtocol(property) {
    if (property.includes('http')) {
        var protocol = window.location.href.split(':')[0];
        if (protocol === 'https') {
            return property.replace(/(^\w+:|^)\/\//, protocol + "://");
        }
    }
    return property;
}
/**
 * Convert turtle to Json-ld object
 * @param document
 * @param partsPath
 */
function turtleToFormUi(document, language) {
    var e_2, _a, e_3, _b;
    return __awaiter(this, void 0, void 0, function () {
        var fields, doc, partsPath, partPath, parts, part, parts_1, parts_1_1, field, subjectKey, subjectPrefix_1, _c, _d, property, partsFields_1, propertyValue, propertyKey, newField, e_3_1, label, e_2_1;
        var _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    fields = {};
                    return [4 /*yield*/, document];
                case 1:
                    doc = _j.sent();
                    partsPath = 'http://www.w3.org/ns/ui#parts';
                    partPath = 'http://www.w3.org/ns/ui#part';
                    return [4 /*yield*/, doc[partPath]];
                case 2:
                    part = _j.sent();
                    if (!!part) return [3 /*break*/, 4];
                    return [4 /*yield*/, loopList(doc[partsPath])];
                case 3:
                    parts = _j.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, [part.value]];
                case 5:
                    parts = _j.sent();
                    _j.label = 6;
                case 6:
                    _j.trys.push([6, 29, 30, 35]);
                    parts_1 = __asyncValues(parts);
                    _j.label = 7;
                case 7: return [4 /*yield*/, parts_1.next()];
                case 8:
                    if (!(parts_1_1 = _j.sent(), !parts_1_1.done)) return [3 /*break*/, 28];
                    field = parts_1_1.value;
                    subjectKey = getPredicateName(field);
                    subjectPrefix_1 = "subject:" + subjectKey;
                    _j.label = 9;
                case 9:
                    _j.trys.push([9, 19, 20, 25]);
                    _c = __asyncValues(query_ldflex_1.default[field].properties);
                    _j.label = 10;
                case 10: return [4 /*yield*/, _c.next()];
                case 11:
                    if (!(_d = _j.sent(), !_d.done)) return [3 /*break*/, 18];
                    property = _d.value;
                    partsFields_1 = {};
                    return [4 /*yield*/, getPropertyValue(field, property, language)
                        /**
                         * If property exist into the subject we added it into the json-ld object
                         */
                    ];
                case 12:
                    propertyValue = _j.sent();
                    if (!(property === partsPath && propertyValue)) return [3 /*break*/, 14];
                    return [4 /*yield*/, turtleToFormUi(query_ldflex_1.default[field], language)];
                case 13:
                    partsFields_1 = _j.sent();
                    return [3 /*break*/, 16];
                case 14:
                    if (!(property === partPath)) return [3 /*break*/, 16];
                    return [4 /*yield*/, turtleToFormUi(query_ldflex_1.default[field], language)];
                case 15:
                    partsFields_1 = _j.sent();
                    _j.label = 16;
                case 16:
                    propertyKey = getPredicateName(property);
                    newField = (_e = {},
                        _e[subjectPrefix_1] = __assign({}, fields[subjectPrefix_1], (_f = {}, _f[propertyKey] = Object.keys(partsFields_1).length === 0 ? propertyValue : partsFields_1, _f)),
                        _e);
                    if (!propertyValue) {
                        newField = {};
                    }
                    fields = __assign({}, fields, newField);
                    _j.label = 17;
                case 17: return [3 /*break*/, 10];
                case 18: return [3 /*break*/, 25];
                case 19:
                    e_3_1 = _j.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 25];
                case 20:
                    _j.trys.push([20, , 23, 24]);
                    if (!(_d && !_d.done && (_b = _c.return))) return [3 /*break*/, 22];
                    return [4 /*yield*/, _b.call(_c)];
                case 21:
                    _j.sent();
                    _j.label = 22;
                case 22: return [3 /*break*/, 24];
                case 23:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 24: return [7 /*endfinally*/];
                case 25:
                    if (!(!fields[subjectPrefix_1][_constants_1.UI.LABEL] &&
                        !fields[subjectPrefix_1][_constants_1.UI.PARTS] &&
                        fields[subjectPrefix_1][_constants_1.UI.PROPERTY])) return [3 /*break*/, 27];
                    return [4 /*yield*/, findLabel(fields[subjectPrefix_1][_constants_1.UI.PROPERTY])];
                case 26:
                    label = _j.sent();
                    fields = __assign({}, fields, (_g = {}, _g[subjectPrefix_1] = __assign({}, fields[subjectPrefix_1], (_h = {}, _h[_constants_1.UI.LABEL] = label, _h)), _g));
                    _j.label = 27;
                case 27: return [3 /*break*/, 7];
                case 28: return [3 /*break*/, 35];
                case 29:
                    e_2_1 = _j.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 35];
                case 30:
                    _j.trys.push([30, , 33, 34]);
                    if (!(parts_1_1 && !parts_1_1.done && (_a = parts_1.return))) return [3 /*break*/, 32];
                    return [4 /*yield*/, _a.call(parts_1)];
                case 31:
                    _j.sent();
                    _j.label = 32;
                case 32: return [3 /*break*/, 34];
                case 33:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 34: return [7 /*endfinally*/];
                case 35: return [2 /*return*/, fields];
            }
        });
    });
}
/**
 * Get the subject prefix
 * @param document
 */
function subjectPrefix(document) {
    if (document.includes('#')) {
        return document.split('#')[0] + "#";
    }
    return document + "#";
}
function partsFields(children, options) {
    return __awaiter(this, void 0, void 0, function () {
        var uniqueName, fieldObject, value, property, podUri, partsKey, _a, _b, _c, _d;
        var _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    uniqueName = uuid_1.default();
                    fieldObject = options.fieldObject, value = options.value, property = options.property, podUri = options.podUri;
                    partsKey = fieldObject[_constants_1.UI.PART] ? _constants_1.UI.PART : _constants_1.UI.PARTS;
                    _e = {};
                    _a = partsKey;
                    _b = [{}, children[partsKey]];
                    _f = {};
                    _c = uniqueName;
                    _d = [(_g = {}, _g[_constants_1.UI.NAME] = uniqueName, _g[_constants_1.UI.VALUE] = value, _g)];
                    return [4 /*yield*/, mapFormModelWithData(fieldObject, value, property, podUri)];
                case 1: return [2 /*return*/, (_e[_a] = __assign.apply(void 0, _b.concat([(_f[_c] = __assign.apply(void 0, _d.concat([(_h.sent())])), _f)])),
                        _e)];
            }
        });
    });
}
function getSubjectLinkId(currentLink) {
    var id = Date.now();
    if (currentLink && currentLink.includes('#')) {
        return currentLink.split('#')[0] + "#" + id;
    }
    return currentLink + "#" + id;
}
/**
 * Updates the formObject with the new values if something has been updated in the podUri's turtle file
 * @param formObject
 * @param podUri
 */
function mapFormObjectWithData(formObject, podUri) {
    var e_4, _a;
    return __awaiter(this, void 0, void 0, function () {
        var updatedFormObject, fields, fields_1, fields_1_1, field, currentField, result, e_4_1;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    updatedFormObject = __assign({}, formObject);
                    fields = Object.keys(formObject);
                    // Clearing cache to force the podUri to be requested again
                    return [4 /*yield*/, query_ldflex_1.default.clearCache(podUri.split('#')[0])
                        /**
                         * Looping into each of the form's updated fields to compare with what the actual data has
                         */
                    ];
                case 1:
                    // Clearing cache to force the podUri to be requested again
                    _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 11, 12, 17]);
                    fields_1 = __asyncValues(fields);
                    _d.label = 3;
                case 3: return [4 /*yield*/, fields_1.next()];
                case 4:
                    if (!(fields_1_1 = _d.sent(), !fields_1_1.done)) return [3 /*break*/, 10];
                    field = fields_1_1.value;
                    currentField = formObject[field];
                    result = void 0;
                    if (!currentField.parent) return [3 /*break*/, 6];
                    return [4 /*yield*/, query_ldflex_1.default[currentField.parent[_constants_1.UI.VALUE]][currentField[_constants_1.UI.PROPERTY]]];
                case 5:
                    result = _d.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, query_ldflex_1.default[currentField[_constants_1.UI.BASE]][currentField[_constants_1.UI.PROPERTY]]];
                case 7:
                    result = _d.sent();
                    _d.label = 8;
                case 8:
                    updatedFormObject = __assign({}, updatedFormObject, (_b = {}, _b[field] = __assign({}, currentField, (_c = {}, _c[_constants_1.UI.OLDVALUE] = result.value, _c)), _b));
                    _d.label = 9;
                case 9: return [3 /*break*/, 3];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _d.trys.push([12, , 15, 16]);
                    if (!(fields_1_1 && !fields_1_1.done && (_a = fields_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(fields_1)];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [2 /*return*/, updatedFormObject];
            }
        });
    });
}
exports.mapFormObjectWithData = mapFormObjectWithData;
function existPodUri(podUri) {
    return podUri.includes('http') && podUri && podUri !== '';
}
/**
 * add the 'property' value to the model properties
 * @param model form model without the data values
 * @param dataSource IRI where to look for the data values
 */
function mapData(model, dataSource) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            /* the model will always has parts, as any for does */
            Object.keys(model[_constants_1.UI.PARTS]).map(function (subject) { return __awaiter(_this, void 0, void 0, function () {
                var value, property, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            value = model[_constants_1.UI.PARTS][subject];
                            if (!(value[_constants_1.RDF.TYPE] === 'http://www.w3.org/ns/ui#Group')) return [3 /*break*/, 2];
                            return [4 /*yield*/, mapData(value, dataSource)];
                        case 1:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            property = value[_constants_1.UI.PROPERTY];
                            /* there are some edge cases in the original that I'm skipping for now: CLASSIFIER */
                            _a = value;
                            _b = _constants_1.UI.VALUE;
                            return [4 /*yield*/, query_ldflex_1.default[dataSource][property]];
                        case 3:
                            /* there are some edge cases in the original that I'm skipping for now: CLASSIFIER */
                            _a[_b] = (_c.sent()).value;
                            model[subject] = value;
                            _c.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.mapData = mapData;
/**
 * This function is designed to clean the cloned fields of any values. In some code paths, the clone parts are coming
 * from existing parts lists, and the values and subjects need to be cleaned and regenerated
 * @param podUri
 * @param children - List of children parts used to create a clone
 */
function cleanClonePartData(children) {
    try {
        Object.keys(children[_constants_1.UI.CLONE_PARTS]).forEach(function (key, index) {
            if (index !== 0) {
                delete children[_constants_1.UI.CLONE_PARTS][key];
            }
        });
        var cloneKey_1 = Object.keys(children[_constants_1.UI.CLONE_PARTS])[0];
        var partsKey = children[_constants_1.UI.CLONE_PARTS][cloneKey_1][_constants_1.UI.PART] ? _constants_1.UI.PART : _constants_1.UI.PARTS;
        var clonePartsKey = children[_constants_1.UI.CLONE_PARTS][cloneKey_1][_constants_1.UI.PART] || children[_constants_1.UI.CLONE_PARTS][cloneKey_1][_constants_1.UI.PARTS]
            ? Object.keys(children[_constants_1.UI.CLONE_PARTS][cloneKey_1][partsKey])
            : [];
        // Loop over all of the subjects in the cloneParts array. There should only be one, but there may be a bug
        // causing there to be more than one. It shouldn't matter, though.
        clonePartsKey.forEach(function (part) {
            var _a;
            // Get the part itself. This should be the group, or the item inside of the multiple
            // Set the value to null for the part and update the base and parent value so it is a new set of parts instead of
            // tied to the original
            var cloneParts = children[_constants_1.UI.CLONE_PARTS][cloneKey_1][_constants_1.UI.PARTS];
            cloneParts[part] = __assign({}, cloneParts[part], (_a = {}, _a[_constants_1.UI.VALUE] = '', _a[_constants_1.UI.OLDVALUE] = '', _a));
            if (cloneParts[part][_constants_1.UI.PARTS]) {
                Object.keys(cloneParts[part][_constants_1.UI.PARTS]).forEach(function (subPartKey) {
                    var _a;
                    cloneParts[part][_constants_1.UI.PARTS][subPartKey] = __assign({}, cloneParts[part][_constants_1.UI.PARTS][subPartKey], (_a = {}, _a[_constants_1.UI.VALUE] = '', _a));
                    // If an old value exists, delete it
                    if (cloneParts[part][_constants_1.UI.PARTS][subPartKey][_constants_1.UI.OLDVALUE]) {
                        delete cloneParts[part][_constants_1.UI.PARTS][subPartKey][_constants_1.UI.OLDVALUE];
                    }
                });
            }
        });
        return children;
    }
    catch (error) {
        throw Error(error);
    }
}
/**
 *  Form Model with user data pod
 * @param modelUi
 * @param subject
 * @param nodeSubject
 * @param parentUri
 */
function mapFormModelWithData(modelUi, podUri, parentProperty, parentUri) {
    var e_5, _a, e_6, _b;
    return __awaiter(this, void 0, void 0, function () {
        var parts, fieldsKey, fields, newModelUi, fields_2, fields_2_1, fieldValue, fieldObject, property, isMultiple, isGroup, hasParts, parentValue, children, updatedField, parentObject, newProperty, result, _c, _d, field, _e, groupHasExistingParts, _f, _g, fieldData, value, e_6_1, idLink, parentPro, formModelTemp, objectValue, partsKey, e_5_1;
        var _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    if (!(podUri.includes('#') && !parentUri && !parentProperty)) return [3 /*break*/, 2];
                    return [4 /*yield*/, query_ldflex_1.default.clearCache(podUri.split('#')[0])];
                case 1:
                    _u.sent();
                    _u.label = 2;
                case 2:
                    parts = modelUi[_constants_1.UI.PART] ? modelUi[_constants_1.UI.PART] : modelUi[_constants_1.UI.PARTS];
                    fieldsKey = modelUi[_constants_1.UI.PART] ? _constants_1.UI.PART : _constants_1.UI.PARTS;
                    fields = Object.keys(modelUi[fieldsKey]);
                    newModelUi = modelUi;
                    _u.label = 3;
                case 3:
                    _u.trys.push([3, 35, 36, 41]);
                    fields_2 = __asyncValues(fields);
                    _u.label = 4;
                case 4: return [4 /*yield*/, fields_2.next()];
                case 5:
                    if (!(fields_2_1 = _u.sent(), !fields_2_1.done)) return [3 /*break*/, 34];
                    fieldValue = fields_2_1.value;
                    fieldObject = parts[fieldValue];
                    property = fieldObject[_constants_1.UI.PROPERTY];
                    isMultiple = fieldObject['rdf:type'].includes('Multiple');
                    isGroup = fieldObject['rdf:type'].includes('Group');
                    hasParts = fieldObject[_constants_1.UI.PARTS] || fieldObject[_constants_1.UI.PART];
                    parentValue = '';
                    children = {};
                    updatedField = [];
                    parentObject = null;
                    if (!property) return [3 /*break*/, 15];
                    newProperty = property.replace(/(^\w+:|^)\/\//, "http://");
                    if (!fieldObject['rdf:type'].includes('Classifier')) return [3 /*break*/, 12];
                    result = void 0;
                    if (!fieldObject[_constants_1.UI.VALUES]) return [3 /*break*/, 8];
                    _c = existPodUri(podUri);
                    if (!_c) return [3 /*break*/, 7];
                    return [4 /*yield*/, query_ldflex_1.default[podUri][newProperty]];
                case 6:
                    _c = (_u.sent());
                    _u.label = 7;
                case 7:
                    result = _c;
                    parentValue = (result && result.value) || '';
                    return [3 /*break*/, 11];
                case 8:
                    _d = existPodUri(podUri);
                    if (!_d) return [3 /*break*/, 10];
                    return [4 /*yield*/, query_ldflex_1.default[podUri].type];
                case 9:
                    _d = (_u.sent());
                    _u.label = 10;
                case 10:
                    result = _d;
                    parentValue = (result && result.value) || '';
                    _u.label = 11;
                case 11: return [3 /*break*/, 15];
                case 12:
                    _e = existPodUri(podUri);
                    if (!_e) return [3 /*break*/, 14];
                    return [4 /*yield*/, query_ldflex_1.default[podUri][newProperty]];
                case 13:
                    _e = (_u.sent());
                    _u.label = 14;
                case 14:
                    field = _e;
                    parentValue = (field && field.value) || '';
                    if (parentUri && parentProperty) {
                        parentObject = (_h = {},
                            _h[_constants_1.UI.VALUE] = podUri,
                            _h[_constants_1.UI.PARENT_PROPERTY] = parentProperty,
                            _h[_constants_1.UI.BASE] = parentUri,
                            _h);
                    }
                    _u.label = 15;
                case 15:
                    if (!hasParts) return [3 /*break*/, 32];
                    if (!isMultiple) return [3 /*break*/, 30];
                    groupHasExistingParts = false;
                    if (!existPodUri(podUri)) return [3 /*break*/, 28];
                    _u.label = 16;
                case 16:
                    _u.trys.push([16, 22, 23, 28]);
                    _f = __asyncValues(query_ldflex_1.default[podUri][property]);
                    _u.label = 17;
                case 17: return [4 /*yield*/, _f.next()];
                case 18:
                    if (!(_g = _u.sent(), !_g.done)) return [3 /*break*/, 21];
                    fieldData = _g.value;
                    value = fieldData.value;
                    groupHasExistingParts = true;
                    return [4 /*yield*/, partsFields(children, { fieldObject: fieldObject, property: property, podUri: podUri, value: value })
                        // TODO: Remove the dependency on lodash by adding a custom deep clone function
                    ];
                case 19:
                    children = _u.sent();
                    // TODO: Remove the dependency on lodash by adding a custom deep clone function
                    if (!children[_constants_1.UI.PART]) {
                        throw new Error('Error rendering Form Model - Multiple has no part property');
                    }
                    children[_constants_1.UI.CLONE_PARTS] = lodash_1.cloneDeep(children[_constants_1.UI.PART]);
                    children = cleanClonePartData(children);
                    _u.label = 20;
                case 20: return [3 /*break*/, 17];
                case 21: return [3 /*break*/, 28];
                case 22:
                    e_6_1 = _u.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 28];
                case 23:
                    _u.trys.push([23, , 26, 27]);
                    if (!(_g && !_g.done && (_b = _f.return))) return [3 /*break*/, 25];
                    return [4 /*yield*/, _b.call(_f)];
                case 24:
                    _u.sent();
                    _u.label = 25;
                case 25: return [3 /*break*/, 27];
                case 26:
                    if (e_6) throw e_6.error;
                    return [7 /*endfinally*/];
                case 27: return [7 /*endfinally*/];
                case 28:
                    if (!!groupHasExistingParts) return [3 /*break*/, 30];
                    idLink = getSubjectLinkId(podUri);
                    return [4 /*yield*/, partsFields(children, { fieldObject: fieldObject, property: property, podUri: podUri, value: idLink })
                        // @ts-ignore
                    ];
                case 29:
                    children = _u.sent();
                    // @ts-ignore
                    children[_constants_1.UI.CLONE_PARTS] = lodash_1.cloneDeep(children[_constants_1.UI.PART]);
                    _u.label = 30;
                case 30:
                    if (!isGroup) return [3 /*break*/, 32];
                    parentPro = parentProperty && parentUri
                        ? (_j = {}, _j[_constants_1.UI.PARENT_PROPERTY] = parentProperty, _j[_constants_1.UI.BASE] = parentUri, _j[_constants_1.UI.VALUE] = podUri, _j) : (_k = {}, _k[_constants_1.UI.PARENT_PROPERTY] = property, _k[_constants_1.UI.BASE] = podUri, _k);
                    return [4 /*yield*/, mapFormModelWithData(fieldObject, podUri, parentProperty, parentUri)];
                case 31:
                    formModelTemp = _u.sent();
                    newModelUi = __assign({}, newModelUi, (_l = {}, _l[_constants_1.UI.PARTS] = __assign({}, newModelUi[_constants_1.UI.PARTS], (_m = {}, _m[fieldValue] = __assign({}, formModelTemp, parentPro, (_o = {}, _o[_constants_1.UI.REFERENCE] = fieldValue, _o)), _m)), _l));
                    _u.label = 32;
                case 32:
                    objectValue = parentValue && !isMultiple
                        ? (_p = {},
                            _p[_constants_1.UI.VALUE] = parentValue,
                            _p[_constants_1.UI.OLDVALUE] = parentValue,
                            _p[_constants_1.UI.NAME] = uuid_1.default(),
                            _p[_constants_1.UI.BASE] = podUri,
                            _p[_constants_1.UI.VALID] = true,
                            _p) : (_q = {}, _q[_constants_1.UI.NAME] = uuid_1.default(), _q[_constants_1.UI.BASE] = podUri, _q[_constants_1.UI.VALID] = true, _q[_constants_1.UI.VALUE] = parentValue, _q);
                    if (fieldObject[_constants_1.UI.VALUES]) {
                        fieldObject = __assign({}, fieldObject);
                    }
                    /**
                     * Updated field if value is not a group
                     */
                    updatedField = isGroup
                        ? updatedField
                        : (_r = {},
                            _r[fieldValue] = __assign({}, fieldObject, objectValue, children),
                            _r);
                    if (parentObject) {
                        updatedField = __assign({}, updatedField, (_s = {}, _s[fieldValue] = __assign({}, updatedField[fieldValue], { parent: parentObject }), _s));
                    }
                    partsKey = modelUi[_constants_1.UI.PART] ? _constants_1.UI.PART : _constants_1.UI.PARTS;
                    newModelUi = __assign({}, newModelUi, (_t = {}, _t[partsKey] = __assign({}, newModelUi[partsKey], updatedField), _t));
                    _u.label = 33;
                case 33: return [3 /*break*/, 4];
                case 34: return [3 /*break*/, 41];
                case 35:
                    e_5_1 = _u.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 41];
                case 36:
                    _u.trys.push([36, , 39, 40]);
                    if (!(fields_2_1 && !fields_2_1.done && (_a = fields_2.return))) return [3 /*break*/, 38];
                    return [4 /*yield*/, _a.call(fields_2)];
                case 37:
                    _u.sent();
                    _u.label = 38;
                case 38: return [3 /*break*/, 40];
                case 39:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 40: return [7 /*endfinally*/];
                case 41: return [2 /*return*/, newModelUi];
            }
        });
    });
}
exports.mapFormModelWithData = mapFormModelWithData;
/**
 * Convert turtle to formModel(JSON-LD)
 * @param documentUri
 * @param partsPath
 */
function convertFormModel(documentUri, documentPod, language) {
    return __awaiter(this, void 0, void 0, function () {
        var model, modelUi;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, turtleToFormUi(query_ldflex_1.default[documentUri], language)];
                case 1:
                    model = _b.sent();
                    modelUi = (_a = {
                            '@context': __assign({}, _constants_1.CONTEXT['@context'], { subject: subjectPrefix(documentUri), document: documentPod })
                        },
                        _a[_constants_1.UI.PARTS] = __assign({}, model),
                        _a);
                    return [2 /*return*/, mapFormModelWithData(modelUi, documentPod)];
            }
        });
    });
}
exports.convertFormModel = convertFormModel;
/**
 * Loop into ordered list
 * @param doc
 */
function loopList(doc) {
    return __awaiter(this, void 0, void 0, function () {
        var parts, field, nextField;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parts = [];
                    return [4 /*yield*/, doc.rdf$first];
                case 1:
                    field = _a.sent();
                    if (!field) return [3 /*break*/, 3];
                    return [4 /*yield*/, loopList(doc.rdf$rest)];
                case 2:
                    nextField = _a.sent();
                    parts = parts.concat([field.value], nextField);
                    _a.label = 3;
                case 3: return [2 /*return*/, parts];
            }
        });
    });
}
function suffixFromJsonLd(predicate, context) {
    var suffix = predicate && predicate.split(':');
    return "" + context[suffix[0]] + suffix[1];
}
exports.suffixFromJsonLd = suffixFromJsonLd;
//# sourceMappingURL=form-ui.js.map