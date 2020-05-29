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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var solid_auth_client_1 = require("solid-auth-client");
var query_ldflex_1 = require("@solid/query-ldflex");
/**
 * Fetch Schema document from pod
 * @param file
 */
exports.fetchSchema = function (file) { return __awaiter(_this, void 0, void 0, function () {
    var schemaDocument, documentText, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, solid_auth_client_1.default.fetch(file, {
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
/**
 * Check if resource exist into pod
 * @param documentUri
 */
exports.existDocument = function (documentUri) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, solid_auth_client_1.default.fetch(documentUri, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })];
    });
}); };
/**
 * Create document on pod
 * @param documentUri
 * @param body
 */
exports.createDocument = function (documentUri, body) {
    if (body === void 0) { body = ''; }
    return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.existDocument(documentUri)];
                case 1:
                    result = _a.sent();
                    if (result.status === 404) {
                        return [2 /*return*/, solid_auth_client_1.default.fetch(documentUri, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/sparql-update'
                                },
                                body: body
                            })];
                    }
                    return [2 /*return*/, result];
            }
        });
    });
};
/**
 * Fetch document from pod if exist using ldflex
 * @param documentUri
 */
exports.fetchLdflexDocument = function (documentUri) { return __awaiter(_this, void 0, void 0, function () {
    var result, document_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(documentUri && documentUri !== '')) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.createDocument(documentUri)];
            case 1:
                result = _a.sent();
                if (result.status !== 200) {
                    throw result;
                }
                return [4 /*yield*/, query_ldflex_1.default[documentUri.toString()]];
            case 2:
                document_1 = _a.sent();
                return [2 /*return*/, document_1];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, error_2];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Get basic user pod info like name and photo
 * @param webId
 */
exports.getBasicPod = function (webId) { return __awaiter(_this, void 0, void 0, function () {
    var nameData, imageData, name_1, image, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!webId) return [3 /*break*/, 3];
                return [4 /*yield*/, query_ldflex_1.default[webId]['vcard:fn']];
            case 1:
                nameData = _a.sent();
                return [4 /*yield*/, query_ldflex_1.default[webId]['vcard:hasPhoto']];
            case 2:
                imageData = _a.sent();
                name_1 = nameData ? nameData.value : webId;
                image = imageData ? imageData.value : null;
                return [2 /*return*/, { name: name_1, image: image, webId: webId }];
            case 3: return [2 /*return*/, {}];
            case 4:
                e_1 = _a.sent();
                throw e_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=solid-fetch.js.map