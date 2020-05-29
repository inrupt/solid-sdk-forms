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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var query_ldflex_1 = require("@solid/query-ldflex");
var data_model_1 = require("@rdfjs/data-model");
var _constants_1 = require("@constants");
var _utils_1 = require("@utils");
var lodash_1 = require("lodash");
/**
 * FormAction class to managament Form Model forms on solid
 */
var FormActions = /** @class */ (function () {
    function FormActions(formModel, formObject) {
        var _this = this;
        this.formModel = formModel;
        this.formObject = formObject;
        /**
         * Retrieve new Form Object
         */
        this.retrieveNewFormObject = function (item, value) {
            var _a;
            _this.formObject = __assign({}, _this.formObject, (_a = {}, _a[item] = value, _a));
            return _this.formObject;
        };
        this.validator = function (field) {
            var _a;
            var updatedField = __assign({}, field, (_a = {}, _a[_constants_1.UI.VALID] = true, _a));
            try {
                var _loop_1 = function (currentValidator) {
                    var _a;
                    if (Object.keys(field).find(function (key) { return key === currentValidator.name; })) {
                        var _b = currentValidator.action(field), valid = _b.valid, errorMessage = _b.errorMessage;
                        if (!valid) {
                            updatedField = __assign({}, updatedField, (_a = {}, _a[_constants_1.UI.VALID] = valid, _a[_constants_1.UI.DEFAULT_ERROR] = errorMessage, _a));
                            return "break";
                        }
                    }
                };
                for (var _i = 0, _b = _utils_1.validator.validators; _i < _b.length; _i++) {
                    var currentValidator = _b[_i];
                    var state_1 = _loop_1(currentValidator);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (error) {
                throw Error(error);
            }
            return updatedField;
        };
        /**
         * Save data into the pod
         */
        this.saveData = function (customFormObject) { return __awaiter(_this, void 0, void 0, function () {
            var keyFields, keyFields_1, keyFields_1_1, key, currentField, validatedField, isType, predicate, podData, updatedValue, parent_1, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keyFields = Object.keys(customFormObject || this.formObject);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 15, 16, 21]);
                        keyFields_1 = __asyncValues(keyFields);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, keyFields_1.next()];
                    case 3:
                        if (!(keyFields_1_1 = _b.sent(), !keyFields_1_1.done)) return [3 /*break*/, 14];
                        key = keyFields_1_1.value;
                        currentField = this.formObject[key];
                        validatedField = __assign({}, currentField);
                        if (!currentField) return [3 /*break*/, 13];
                        // Run the field through the validator to ensure it is valid according to constraints
                        validatedField = this.validator(currentField);
                        isType = currentField[_constants_1.UI.PROPERTY].includes('type');
                        if (!validatedField[_constants_1.UI.VALID]) return [3 /*break*/, 12];
                        predicate = currentField[_constants_1.UI.PROPERTY];
                        podData = void 0;
                        // Set the field copy object's value to a link to the value (if it is a type field) or the original object's value
                        validatedField[_constants_1.UI.VALUE] = isType ? data_model_1.namedNode(currentField.value) : currentField.value;
                        updatedValue = typeof validatedField[_constants_1.UI.VALUE] === 'boolean'
                            ? validatedField[_constants_1.UI.VALUE].toString()
                            : validatedField[_constants_1.UI.VALUE];
                        if (!currentField.parent) return [3 /*break*/, 9];
                        podData = isType
                            ? query_ldflex_1.default[currentField.parent[_constants_1.UI.VALUE]].type
                            : query_ldflex_1.default[currentField.parent[_constants_1.UI.VALUE]][predicate];
                        if (!(currentField[_constants_1.UI.OLDVALUE] && currentField[_constants_1.UI.OLDVALUE] !== '')) return [3 /*break*/, 5];
                        return [4 /*yield*/, podData.set(updatedValue)];
                    case 4:
                        _b.sent();
                        currentField[_constants_1.UI.VALUE] = updatedValue;
                        return [3 /*break*/, 8];
                    case 5:
                        parent_1 = currentField.parent;
                        return [4 /*yield*/, query_ldflex_1.default[parent_1[_constants_1.UI.BASE]][parent_1[_constants_1.UI.PARENT_PROPERTY]].add(data_model_1.namedNode(parent_1[_constants_1.UI.VALUE]))];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, podData.add(updatedValue)];
                    case 7:
                        _b.sent();
                        currentField[_constants_1.UI.VALUE] = updatedValue;
                        _b.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        podData = isType
                            ? query_ldflex_1.default[currentField[_constants_1.UI.BASE]].type
                            : query_ldflex_1.default[currentField[_constants_1.UI.BASE]][predicate];
                        return [4 /*yield*/, podData.set(updatedValue)];
                    case 10:
                        _b.sent();
                        currentField[_constants_1.UI.VALUE] = updatedValue;
                        _b.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12: throw new Error('Validation failed');
                    case 13: return [3 /*break*/, 2];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _b.trys.push([16, , 19, 20]);
                        if (!(keyFields_1_1 && !keyFields_1_1.done && (_a = keyFields_1.return))) return [3 /*break*/, 18];
                        return [4 /*yield*/, _a.call(keyFields_1)];
                    case 17:
                        _b.sent();
                        _b.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21:
                        this.resetFormObject();
                        return [2 /*return*/, this.formModel];
                }
            });
        }); };
        /**
         * Reset FormObject
         */
        this.resetFormObject = function () {
            _this.formObject = {};
        };
        /**
         * Delete field from the form model object
         * This function recursively traverses the entire form model object to find the field to delete
         */
        this.deleteField = function (field) { return __awaiter(_this, void 0, void 0, function () {
            function deleteRecursive(field, model) {
                var e_2, _a;
                return __awaiter(this, void 0, void 0, function () {
                    var modelKeys, modelKeys_1, modelKeys_1_1, fieldKey, partToDelete, parts, _i, _b, key, groupParts, _c, _d, groupPartKey, _e, value, withoutProperty, _f, _g, _h, _j, _k, e_2_1, error_2;
                    var _l, _m;
                    return __generator(this, function (_o) {
                        switch (_o.label) {
                            case 0:
                                _o.trys.push([0, 23, , 24]);
                                modelKeys = Object.keys(model);
                                _o.label = 1;
                            case 1:
                                _o.trys.push([1, 16, 17, 22]);
                                modelKeys_1 = __asyncValues(modelKeys);
                                _o.label = 2;
                            case 2: return [4 /*yield*/, modelKeys_1.next()];
                            case 3:
                                if (!(modelKeys_1_1 = _o.sent(), !modelKeys_1_1.done)) return [3 /*break*/, 15];
                                fieldKey = modelKeys_1_1.value;
                                if (!(model[fieldKey][_constants_1.UI.NAME] === field)) return [3 /*break*/, 12];
                                partToDelete = model[fieldKey];
                                parts = partToDelete[_constants_1.UI.PARTS] || partToDelete[_constants_1.UI.PART];
                                if (!parts) return [3 /*break*/, 10];
                                _i = 0, _b = Object.keys(parts);
                                _o.label = 4;
                            case 4:
                                if (!(_i < _b.length)) return [3 /*break*/, 10];
                                key = _b[_i];
                                groupParts = partToDelete[_constants_1.UI.PARTS][key][_constants_1.UI.PARTS];
                                return [4 /*yield*/, FormActions.deleteFieldPod(partToDelete[_constants_1.UI.PARTS][key])
                                    // Loop over each of the group parts and delete them individually. This prevents there
                                    // from being orphaned data in the pod
                                ];
                            case 5:
                                _o.sent();
                                _c = 0, _d = Object.keys(groupParts);
                                _o.label = 6;
                            case 6:
                                if (!(_c < _d.length)) return [3 /*break*/, 9];
                                groupPartKey = _d[_c];
                                return [4 /*yield*/, FormActions.deleteFieldPod(partToDelete[_constants_1.UI.PARTS][key][_constants_1.UI.PARTS][groupPartKey])];
                            case 7:
                                _o.sent();
                                _o.label = 8;
                            case 8:
                                _c++;
                                return [3 /*break*/, 6];
                            case 9:
                                _i++;
                                return [3 /*break*/, 4];
                            case 10: 
                            // Second, delete the link of the Group os it is no longer referenced
                            return [4 /*yield*/, FormActions.deleteFieldPod(partToDelete)
                                // Save the results in the model
                            ];
                            case 11:
                                // Second, delete the link of the Group os it is no longer referenced
                                _o.sent();
                                _e = fieldKey, value = model[_e], withoutProperty = __rest(model, [typeof _e === "symbol" ? _e : _e + ""]);
                                model = withoutProperty;
                                found = true;
                                return [3 /*break*/, 15];
                            case 12:
                                if (!model[fieldKey][_constants_1.UI.PART]) return [3 /*break*/, 14];
                                _f = [{}, model];
                                _l = {};
                                _g = fieldKey;
                                _h = [{}, model[fieldKey]];
                                _m = {};
                                _j = _constants_1.UI.PART;
                                _k = [{}];
                                return [4 /*yield*/, deleteRecursive(field, model[fieldKey][_constants_1.UI.PART])];
                            case 13:
                                // If this is not the node we want to delete, but the node has parts, keep walking the tree recursively
                                model = __assign.apply(void 0, _f.concat([(_l[_g] = __assign.apply(void 0, _h.concat([(_m[_j] = __assign.apply(void 0, _k.concat([(_o.sent())])), _m)])), _l)]));
                                if (found) {
                                    return [3 /*break*/, 15];
                                }
                                _o.label = 14;
                            case 14: return [3 /*break*/, 2];
                            case 15: return [3 /*break*/, 22];
                            case 16:
                                e_2_1 = _o.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 22];
                            case 17:
                                _o.trys.push([17, , 20, 21]);
                                if (!(modelKeys_1_1 && !modelKeys_1_1.done && (_a = modelKeys_1.return))) return [3 /*break*/, 19];
                                return [4 /*yield*/, _a.call(modelKeys_1)];
                            case 18:
                                _o.sent();
                                _o.label = 19;
                            case 19: return [3 /*break*/, 21];
                            case 20:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 21: return [7 /*endfinally*/];
                            case 22: return [2 /*return*/, model];
                            case 23:
                                error_2 = _o.sent();
                                throw error_2;
                            case 24: return [2 /*return*/];
                        }
                    });
                });
            }
            var partsObject, found, updatedModel, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        partsObject = this.formModel[_constants_1.UI.PARTS];
                        found = false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, deleteRecursive(field, partsObject)
                            /**
                             * Update private formModel store
                             */
                        ];
                    case 2:
                        updatedModel = _b.sent();
                        /**
                         * Update private formModel store
                         */
                        this.formModel = __assign({}, this.formModel, (_a = {}, _a[_constants_1.UI.PARTS] = __assign({}, updatedModel), _a));
                        return [2 /*return*/, this.formModel];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, Error(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Add new field into Form Model
         */
        this.addNewField = function (nodeName) {
            var _a;
            var found = false;
            // Get list of parts from the form model
            var partsObject = _this.formModel[_constants_1.UI.PARTS];
            function findField(nodeName, model) {
                var _loop_2 = function (fieldKey) {
                    var _a;
                    var currentField = model[fieldKey];
                    // If we find the right node
                    if (currentField[_constants_1.UI.NAME] === nodeName) {
                        // Get the key of the first item in clone parts
                        var copiedField = Object.keys(currentField[_constants_1.UI.CLONE_PARTS])[0];
                        // Get a new subject based on the existing subject - so the new fields are siblings in the pod
                        var idLink_1 = FormActions.getSubjectLinkId(currentField[_constants_1.UI.CLONE_PARTS][copiedField][_constants_1.UI.VALUE]);
                        // This field is used for deleting and adding immediately, so this be used before a refresh generates the correct value
                        currentField[_constants_1.UI.BASE] = idLink_1;
                        // Generate a new unique ID for the form object
                        var uniqueName = uuid_1.default();
                        var parentProperty = currentField[_constants_1.UI.PROPERTY];
                        var parts = lodash_1.cloneDeep(currentField[_constants_1.UI.CLONE_PARTS][copiedField]);
                        var cleanedNodes = FormActions.cleanFieldNode(parts);
                        // Updates the new part's name and value, which is a subject for this part
                        var partsNode = currentField[_constants_1.UI.PART];
                        partsNode[uniqueName] = __assign({}, cleanedNodes, (_a = {}, _a[_constants_1.UI.NAME] = uniqueName, _a[_constants_1.UI.VALUE] = idLink_1, _a[_constants_1.UI.PARENT_PROPERTY] = parentProperty, _a));
                        var partsList_1 = partsNode[uniqueName][_constants_1.UI.PARTS];
                        // For each part in the parts list, update the parent property to point at the newly generated subject
                        Object.keys(partsList_1).forEach(function (item) {
                            var _a;
                            partsList_1[item].parent = __assign({}, partsList_1[item].parent, (_a = {}, _a[_constants_1.UI.PARENT_PROPERTY] = currentField[_constants_1.UI.PROPERTY], _a[_constants_1.UI.BASE] = idLink_1, _a[_constants_1.UI.VALUE] = idLink_1, _a));
                            partsList_1[item][_constants_1.UI.BASE] = idLink_1;
                            // If the partsList has it's own parts (such as a Multiple containing a Group) then update all the sub parts to have the same subject in the value field
                            // When we autosave fields, we get the context of just the field, so each field needs to have a copy of it's subject
                            if (partsList_1[item][_constants_1.UI.PARTS]) {
                                Object.keys(partsList_1[item][_constants_1.UI.PARTS]).forEach(function (subItem) {
                                    var _a;
                                    partsList_1[item][_constants_1.UI.PARTS][subItem].parent = __assign({}, partsList_1[item][_constants_1.UI.PARTS][subItem].parent, (_a = {}, _a[_constants_1.UI.VALUE] = idLink_1, _a));
                                });
                            }
                        });
                        found = true;
                        return "break";
                    }
                };
                for (var fieldKey in model) {
                    var state_2 = _loop_2(fieldKey);
                    if (state_2 === "break")
                        break;
                }
                return model;
            }
            var updatedParts = findField(nodeName, partsObject);
            return __assign({}, _this.formModel, (_a = {}, _a[_constants_1.UI.PARTS] = __assign({}, updatedParts), _a));
        };
    }
    /**
     * Create random subject link for a node
     */
    FormActions.getSubjectLinkId = function (currentLink) {
        if (currentLink && currentLink.includes('#')) {
            var id = Date.now();
            return currentLink.split('#')[0] + "#" + id;
        }
    };
    /**
     * Clean field node into Form Model object
     */
    FormActions.cleanFieldNode = function (field) {
        var _a, _b, _c;
        var updatedField = field;
        if (updatedField && updatedField[_constants_1.UI.PARTS]) {
            for (var childKey in updatedField[_constants_1.UI.PARTS]) {
                updatedField = __assign({}, updatedField, (_a = {}, _a[_constants_1.UI.PARTS] = __assign({}, updatedField[_constants_1.UI.PARTS], (_b = {}, _b[childKey] = __assign({}, updatedField[_constants_1.UI.PARTS][childKey], FormActions.cleanFieldNode(updatedField[childKey])), _b)), _a));
            }
        }
        return __assign({}, updatedField, (_c = {}, _c[_constants_1.UI.VALUE] = '', _c[_constants_1.UI.OLDVALUE] = '', _c[_constants_1.UI.NAME] = uuid_1.default(), _c));
    };
    /**
     * Delete field from pod
     */
    FormActions.deleteFieldPod = function (field) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!field[_constants_1.UI.BASE]) return [3 /*break*/, 4];
                    if (!field[_constants_1.UI.PARENT_PROPERTY]) return [3 /*break*/, 2];
                    return [4 /*yield*/, query_ldflex_1.default[field[_constants_1.UI.BASE]][field[_constants_1.UI.PARENT_PROPERTY]].delete(data_model_1.namedNode(field[_constants_1.UI.VALUE]))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: 
                // TODO: for newly added groups,
                return [4 /*yield*/, query_ldflex_1.default[field[_constants_1.UI.BASE]][field[_constants_1.UI.PROPERTY]].delete(field[_constants_1.UI.VALUE])];
                case 3:
                    // TODO: for newly added groups,
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return FormActions;
}());
exports.FormActions = FormActions;
//# sourceMappingURL=form-actions.js.map