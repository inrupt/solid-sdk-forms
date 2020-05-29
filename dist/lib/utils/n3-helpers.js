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
Object.defineProperty(exports, "__esModule", { value: true });
var solid_fetch_1 = require("./solid-fetch");
var N3 = require("n3");
function changeHostProtocol(from) {
    if (from.includes('http')) {
        var protocol = window.location.href.split(':')[0];
        return from.replace(/(^\w+:|^)\/\//, protocol + "://");
    }
    return from;
}
function getLabel(label) {
    var cleanLabel = label.includes('@') ? label.split('@')[0] : label;
    return cleanLabel.replace(/[^\w\s]/gi, '');
}
function getClassifierOptions(from) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedFrom, type, document, _a, options, optionsPromise, quads, quad, deprecated, label, currentPredicateType, currentType;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    updatedFrom = changeHostProtocol(from);
                    type = from.includes('#') ? from.split('#')[1] : 'Type';
                    if (!updatedFrom) return [3 /*break*/, 2];
                    return [4 /*yield*/, solid_fetch_1.fetchSchema(updatedFrom)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = null;
                    _b.label = 3;
                case 3:
                    document = _a;
                    options = [];
                    if (!document) return [3 /*break*/, 5];
                    optionsPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var quads;
                        return __generator(this, function (_a) {
                            quads = {};
                            new N3.Parser().parse(document, function (error, triple) {
                                var _a, _b;
                                if (triple) {
                                    quads = __assign({}, quads, (_a = {}, _a[triple.subject.id] = __assign({}, quads[triple.subject.id], (_b = {}, _b[triple.predicate.id] = triple.object.id, _b)), _a));
                                }
                                else {
                                    resolve(quads);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, optionsPromise];
                case 4:
                    quads = _b.sent();
                    for (quad in quads) {
                        deprecated = quads[quad]['http://www.w3.org/2002/07/owl#deprecated'];
                        label = quads[quad]['http://www.w3.org/2000/01/rdf-schema#label'];
                        currentPredicateType = quads[quad]['http://www.w3.org/2000/01/rdf-schema#subClassOf'];
                        currentType = currentPredicateType && currentPredicateType.includes('#')
                            ? currentPredicateType.split('#')[1]
                            : currentPredicateType;
                        if ((!deprecated || deprecated.includes('false')) &&
                            quad &&
                            (currentType && currentType === type)) {
                            options = options.concat([quad]);
                        }
                    }
                    return [2 /*return*/, options.length === 0 ? ['No Options'] : options];
                case 5: return [2 /*return*/, (options = ['No Options'])];
            }
        });
    });
}
exports.getClassifierOptions = getClassifierOptions;
//# sourceMappingURL=n3-helpers.js.map