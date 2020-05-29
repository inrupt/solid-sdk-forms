(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@shexjs/parser'), require('@shexjs/core'), require('solid-auth-client'), require('@solid/query-ldflex'), require('uuid'), require('lodash'), require('moment'), require('@rdfjs/data-model')) :
    typeof define === 'function' && define.amd ? define(['exports', '@shexjs/parser', '@shexjs/core', 'solid-auth-client', '@solid/query-ldflex', 'uuid', 'lodash', 'moment', '@rdfjs/data-model'], factory) :
    (global = global || self, factory(global.solidForms = {}, global.shexParser, global.shexCore, global.auth, global.data, global.uuid, global.lodash, global.moment, global.dataModel));
}(this, function (exports, shexParser, shexCore, auth, data, uuid, lodash, moment, dataModel) { 'use strict';

    shexParser = shexParser && shexParser.hasOwnProperty('default') ? shexParser['default'] : shexParser;
    shexCore = shexCore && shexCore.hasOwnProperty('default') ? shexCore['default'] : shexCore;
    auth = auth && auth.hasOwnProperty('default') ? auth['default'] : auth;
    data = data && data.hasOwnProperty('default') ? data['default'] : data;
    uuid = uuid && uuid.hasOwnProperty('default') ? uuid['default'] : uuid;
    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

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

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

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

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        XSD = 'http://www.w3.org/2001/XMLSchema#',
        SWAP = 'http://www.w3.org/2000/10/swap/';
    var namespaces = {
      xsd: {
        decimal: XSD + 'decimal',
        boolean: XSD + 'boolean',
        double: XSD + 'double',
        integer: XSD + 'integer',
        string: XSD + 'string'
      },
      rdf: {
        type: RDF + 'type',
        nil: RDF + 'nil',
        first: RDF + 'first',
        rest: RDF + 'rest',
        langString: RDF + 'langString'
      },
      owl: {
        sameAs: 'http://www.w3.org/2002/07/owl#sameAs'
      },
      r: {
        forSome: SWAP + 'reify#forSome',
        forAll: SWAP + 'reify#forAll'
      },
      log: {
        implies: SWAP + 'log#implies'
      }
    };

    // N3.js implementations of the RDF/JS core data types
    const {
      rdf,
      xsd
    } = namespaces;
    var DataFactory, DEFAULTGRAPH;
    var _blankNodeCounter = 0; // ## Term constructor

    class Term {
      constructor(id) {
        this.id = id;
      } // ### The value of this term


      get value() {
        return this.id;
      } // ### Returns whether this object represents the same term as the other


      equals(other) {
        // If both terms were created by this library,
        // equality can be computed through ids
        if (other instanceof Term) return this.id === other.id; // Otherwise, compare term type and value

        return !!other && this.termType === other.termType && this.value === other.value;
      } // ### Returns a plain object representation of this term


      toJSON() {
        return {
          termType: this.termType,
          value: this.value
        };
      }

    } // ## NamedNode constructor


    class NamedNode extends Term {
      // ### The term type of this term
      get termType() {
        return 'NamedNode';
      }

    } // ## Literal constructor


    class Literal extends Term {
      // ### The term type of this term
      get termType() {
        return 'Literal';
      } // ### The text value of this literal


      get value() {
        return this.id.substring(1, this.id.lastIndexOf('"'));
      } // ### The language of this literal


      get language() {
        // Find the last quotation mark (e.g., '"abc"@en-us')
        var id = this.id,
            atPos = id.lastIndexOf('"') + 1; // If "@" it follows, return the remaining substring; empty otherwise

        return atPos < id.length && id[atPos++] === '@' ? id.substr(atPos).toLowerCase() : '';
      } // ### The datatype IRI of this literal


      get datatype() {
        return new NamedNode(this.datatypeString);
      } // ### The datatype string of this literal


      get datatypeString() {
        // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
        var id = this.id,
            dtPos = id.lastIndexOf('"') + 1,
            ch; // If "^" it follows, return the remaining substring

        return dtPos < id.length && (ch = id[dtPos]) === '^' ? id.substr(dtPos + 2) : // If "@" follows, return rdf:langString; xsd:string otherwise
        ch !== '@' ? xsd.string : rdf.langString;
      } // ### Returns whether this object represents the same term as the other


      equals(other) {
        // If both literals were created by this library,
        // equality can be computed through ids
        if (other instanceof Literal) return this.id === other.id; // Otherwise, compare term type, value, language, and datatype

        return !!other && !!other.datatype && this.termType === other.termType && this.value === other.value && this.language === other.language && this.datatype.value === other.datatype.value;
      }

      toJSON() {
        return {
          termType: this.termType,
          value: this.value,
          language: this.language,
          datatype: {
            termType: 'NamedNode',
            value: this.datatypeString
          }
        };
      }

    } // ## BlankNode constructor


    class BlankNode extends Term {
      constructor(name) {
        super('_:' + name);
      } // ### The term type of this term


      get termType() {
        return 'BlankNode';
      } // ### The name of this blank node


      get value() {
        return this.id.substr(2);
      }

    }

    class Variable extends Term {
      constructor(name) {
        super('?' + name);
      } // ### The term type of this term


      get termType() {
        return 'Variable';
      } // ### The name of this variable


      get value() {
        return this.id.substr(1);
      }

    } // ## DefaultGraph constructor


    class DefaultGraph extends Term {
      constructor() {
        super('');
        return DEFAULTGRAPH || this;
      } // ### The term type of this term


      get termType() {
        return 'DefaultGraph';
      } // ### Returns whether this object represents the same term as the other


      equals(other) {
        // If both terms were created by this library,
        // equality can be computed through strict equality;
        // otherwise, compare term types.
        return this === other || !!other && this.termType === other.termType;
      }

    } // ## DefaultGraph singleton


    DEFAULTGRAPH = new DefaultGraph(); // ### Constructs a term from the given internal string ID

    function fromId(id, factory) {
      factory = factory || DataFactory; // Falsy value or empty string indicate the default graph

      if (!id) return factory.defaultGraph(); // Identify the term type based on the first character

      switch (id[0]) {
        case '_':
          return factory.blankNode(id.substr(2));

        case '?':
          return factory.variable(id.substr(1));

        case '"':
          // Shortcut for internal literals
          if (factory === DataFactory) return new Literal(id); // Literal without datatype or language

          if (id[id.length - 1] === '"') return factory.literal(id.substr(1, id.length - 2)); // Literal with datatype or language

          var endPos = id.lastIndexOf('"', id.length - 1);
          return factory.literal(id.substr(1, endPos - 1), id[endPos + 1] === '@' ? id.substr(endPos + 2) : factory.namedNode(id.substr(endPos + 3)));

        default:
          return factory.namedNode(id);
      }
    } // ### Constructs an internal string ID from the given term or ID string


    function toId(term) {
      if (typeof term === 'string') return term;
      if (term instanceof Term) return term.id;
      if (!term) return DEFAULTGRAPH.id; // Term instantiated with another library

      switch (term.termType) {
        case 'NamedNode':
          return term.value;

        case 'BlankNode':
          return '_:' + term.value;

        case 'Variable':
          return '?' + term.value;

        case 'DefaultGraph':
          return '';

        case 'Literal':
          return '"' + term.value + '"' + (term.language ? '@' + term.language : term.datatype && term.datatype.value !== xsd.string ? '^^' + term.datatype.value : '');

        default:
          throw new Error('Unexpected termType: ' + term.termType);
      }
    } // ## Quad constructor


    class Quad {
      constructor(subject, predicate, object, graph) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.graph = graph || DEFAULTGRAPH;
      } // ### Returns a plain object representation of this quad


      toJSON() {
        return {
          subject: this.subject.toJSON(),
          predicate: this.predicate.toJSON(),
          object: this.object.toJSON(),
          graph: this.graph.toJSON()
        };
      } // ### Returns whether this object represents the same quad as the other


      equals(other) {
        return !!other && this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph);
      }

    } // ## DataFactory singleton


    DataFactory = {
      // ### Public factory functions
      namedNode,
      blankNode,
      variable,
      literal,
      defaultGraph,
      quad,
      triple: quad,
      // ### Internal datatype constructors
      internal: {
        Term,
        NamedNode,
        BlankNode,
        Variable,
        Literal,
        DefaultGraph,
        Quad,
        Triple: Quad,
        fromId,
        toId
      }
    };
    var DataFactory$1 = DataFactory; // ### Creates an IRI

    function namedNode(iri) {
      return new NamedNode(iri);
    } // ### Creates a blank node


    function blankNode(name) {
      if (!name) name = 'n3-' + _blankNodeCounter++;
      return new BlankNode(name);
    } // ### Creates a literal


    function literal(value, languageOrDataType) {
      // Create a language-tagged string
      if (typeof languageOrDataType === 'string') return new Literal('"' + value + '"@' + languageOrDataType.toLowerCase()); // Create a datatyped literal

      var datatype = languageOrDataType && languageOrDataType.value || '';

      if (!datatype) {
        switch (typeof value) {
          // Convert a boolean
          case 'boolean':
            datatype = xsd.boolean;
            break;
          // Convert an integer or double

          case 'number':
            if (Number.isFinite(value)) datatype = Number.isInteger(value) ? xsd.integer : xsd.double;else {
              datatype = xsd.double;
              if (!Number.isNaN(value)) value = value > 0 ? 'INF' : '-INF';
            }
            break;
          // No datatype, so convert a plain string

          default:
            return new Literal('"' + value + '"');
        }
      }

      return new Literal('"' + value + '"^^' + datatype);
    } // ### Creates a variable


    function variable(name) {
      return new Variable(name);
    } // ### Returns the default graph


    function defaultGraph() {
      return DEFAULTGRAPH;
    } // ### Creates a quad


    function quad(subject, predicate, object, graph) {
      return new Quad(subject, predicate, object, graph);
    }

    var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var inited = false;

    function init() {
      inited = true;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }

      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;
    }

    function toByteArray(b64) {
      if (!inited) {
        init();
      }

      var i, j, l, tmp, placeHolders, arr;
      var len = b64.length;

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      } // the number of equal signs (place holders)
      // if there are two placeholders, than the two characters before it
      // represent one byte
      // if there is only one, then the three characters before it represent 2 bytes
      // this is just a cheap hack to not do indexOf twice


      placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

      arr = new Arr(len * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

      l = placeHolders > 0 ? len - 4 : len;
      var L = 0;

      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 0xFF;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      if (placeHolders === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = tmp & 0xFF;
      } else if (placeHolders === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 0xFF;
        arr[L++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];

      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        output.push(tripletToBase64(tmp));
      }

      return output.join('');
    }

    function fromByteArray(uint8) {
      if (!inited) {
        init();
      }

      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

      var output = '';
      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3
      // go through the array every three bytes, we'll deal with trailing stuff later

      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      } // pad the end with zeros, but make sure to not forget the extra bytes


      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 0x3F];
        output += '==';
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 0x3F];
        output += lookup[tmp << 2 & 0x3F];
        output += '=';
      }

      parts.push(output);
      return parts.join('');
    }

    function read(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;

      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;

      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }

      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    }
    function write(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);

        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }

        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }

        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = e << mLen | m;
      eLen += mLen;

      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    }

    var toString = {}.toString;
    var isArray = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };

    var INSPECT_MAX_BYTES = 50;
    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Use Object implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * Due to various browser bugs, sometimes the Object implementation will be used even
     * when the browser supports typed arrays.
     *
     * Note:
     *
     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
     *
     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
     *
     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
     *     incorrect length in some situations.

     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
     * get the Object implementation, which is slower but behaves correctly.
     */

    Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;

    function kMaxLength() {
      return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
    }

    function createBuffer(that, length) {
      if (kMaxLength() < length) {
        throw new RangeError('Invalid typed array length');
      }

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = new Uint8Array(length);
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        if (that === null) {
          that = new Buffer(length);
        }

        that.length = length;
      }

      return that;
    }
    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */


    function Buffer(arg, encodingOrOffset, length) {
      if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
        return new Buffer(arg, encodingOrOffset, length);
      } // Common case.


      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new Error('If encoding is specified then the first argument must be a string');
        }

        return allocUnsafe(this, arg);
      }

      return from(this, arg, encodingOrOffset, length);
    }
    Buffer.poolSize = 8192; // not used by this implementation
    // TODO: Legacy, not needed anymore. Remove in next major version.

    Buffer._augment = function (arr) {
      arr.__proto__ = Buffer.prototype;
      return arr;
    };

    function from(that, value, encodingOrOffset, length) {
      if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number');
      }

      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
      }

      if (typeof value === 'string') {
        return fromString(that, value, encodingOrOffset);
      }

      return fromObject(that, value);
    }
    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/


    Buffer.from = function (value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      Buffer.prototype.__proto__ = Uint8Array.prototype;
      Buffer.__proto__ = Uint8Array;
    }

    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be a number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }

    function alloc(that, size, fill, encoding) {
      assertSize(size);

      if (size <= 0) {
        return createBuffer(that, size);
      }

      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
      }

      return createBuffer(that, size);
    }
    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/


    Buffer.alloc = function (size, fill, encoding) {
      return alloc(null, size, fill, encoding);
    };

    function allocUnsafe(that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

      if (!Buffer.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }

      return that;
    }
    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */


    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(null, size);
    };
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */


    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(null, size);
    };

    function fromString(that, string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
      }

      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }

      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
      var actual = that.write(string, encoding);

      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        that = that.slice(0, actual);
      }

      return that;
    }

    function fromArrayLike(that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);

      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }

      return that;
    }

    function fromArrayBuffer(that, array, byteOffset, length) {
      array.byteLength; // this throws if `array` is not a valid ArrayBuffer

      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('\'offset\' is out of bounds');
      }

      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('\'length\' is out of bounds');
      }

      if (byteOffset === undefined && length === undefined) {
        array = new Uint8Array(array);
      } else if (length === undefined) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = array;
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        that = fromArrayLike(that, array);
      }

      return that;
    }

    function fromObject(that, obj) {
      if (internalIsBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);

        if (that.length === 0) {
          return that;
        }

        obj.copy(that, 0, 0, len);
        return that;
      }

      if (obj) {
        if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
          if (typeof obj.length !== 'number' || isnan(obj.length)) {
            return createBuffer(that, 0);
          }

          return fromArrayLike(that, obj);
        }

        if (obj.type === 'Buffer' && isArray(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }

      throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
    }

    function checked(length) {
      // Note: cannot use `length < kMaxLength()` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= kMaxLength()) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
      }

      return length | 0;
    }
    Buffer.isBuffer = isBuffer;

    function internalIsBuffer(b) {
      return !!(b != null && b._isBuffer);
    }

    Buffer.compare = function compare(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError('Arguments must be Buffers');
      }

      if (a === b) return 0;
      var x = a.length;
      var y = b.length;

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };

    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;

        default:
          return false;
      }
    };

    Buffer.concat = function concat(list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }

      if (list.length === 0) {
        return Buffer.alloc(0);
      }

      var i;

      if (length === undefined) {
        length = 0;

        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }

      var buffer = Buffer.allocUnsafe(length);
      var pos = 0;

      for (i = 0; i < list.length; ++i) {
        var buf = list[i];

        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }

        buf.copy(buffer, pos);
        pos += buf.length;
      }

      return buffer;
    };

    function byteLength(string, encoding) {
      if (internalIsBuffer(string)) {
        return string.length;
      }

      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength;
      }

      if (typeof string !== 'string') {
        string = '' + string;
      }

      var len = string.length;
      if (len === 0) return 0; // Use a for loop to avoid recursion

      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len;

          case 'utf8':
          case 'utf-8':
          case undefined:
            return utf8ToBytes(string).length;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2;

          case 'hex':
            return len >>> 1;

          case 'base64':
            return base64ToBytes(string).length;

          default:
            if (loweredCase) return utf8ToBytes(string).length; // assume utf8

            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }

    Buffer.byteLength = byteLength;

    function slowToString(encoding, start, end) {
      var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.
      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

      if (start === undefined || start < 0) {
        start = 0;
      } // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.


      if (start > this.length) {
        return '';
      }

      if (end === undefined || end > this.length) {
        end = this.length;
      }

      if (end <= 0) {
        return '';
      } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


      end >>>= 0;
      start >>>= 0;

      if (end <= start) {
        return '';
      }

      if (!encoding) encoding = 'utf8';

      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end);

          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end);

          case 'ascii':
            return asciiSlice(this, start, end);

          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end);

          case 'base64':
            return base64Slice(this, start, end);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
        }
      }
    } // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
    // Buffer instances.


    Buffer.prototype._isBuffer = true;

    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }

    Buffer.prototype.swap16 = function swap16() {
      var len = this.length;

      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }

      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }

      return this;
    };

    Buffer.prototype.swap32 = function swap32() {
      var len = this.length;

      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }

      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }

      return this;
    };

    Buffer.prototype.swap64 = function swap64() {
      var len = this.length;

      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }

      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }

      return this;
    };

    Buffer.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };

    Buffer.prototype.equals = function equals(b) {
      if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
      if (this === b) return true;
      return Buffer.compare(this, b) === 0;
    };

    Buffer.prototype.inspect = function inspect() {
      var str = '';
      var max = INSPECT_MAX_BYTES;

      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
        if (this.length > max) str += ' ... ';
      }

      return '<Buffer ' + str + '>';
    };

    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError('Argument must be a Buffer');
      }

      if (start === undefined) {
        start = 0;
      }

      if (end === undefined) {
        end = target ? target.length : 0;
      }

      if (thisStart === undefined) {
        thisStart = 0;
      }

      if (thisEnd === undefined) {
        thisEnd = this.length;
      }

      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
      }

      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }

      if (thisStart >= thisEnd) {
        return -1;
      }

      if (start >= end) {
        return 1;
      }

      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);

      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf


    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1; // Normalize byteOffset

      if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
      }

      byteOffset = +byteOffset; // Coerce to Number.

      if (isNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
      } // Normalize byteOffset: negative offsets start from the end of the buffer


      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

      if (byteOffset >= buffer.length) {
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
      } // Normalize val


      if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
      } // Finally, search either indexOf (if dir is true) or lastIndexOf


      if (internalIsBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1;
        }

        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]

        if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }

        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }

      throw new TypeError('val must be string, number or Buffer');
    }

    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;

      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();

        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }

          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }

      function read(buf, i) {
        if (indexSize === 1) {
          return buf[i];
        } else {
          return buf.readUInt16BE(i * indexSize);
        }
      }

      var i;

      if (dir) {
        var foundIndex = -1;

        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

        for (i = byteOffset; i >= 0; i--) {
          var found = true;

          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }

          if (found) return i;
        }
      }

      return -1;
    }

    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };

    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };

    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };

    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;

      if (!length) {
        length = remaining;
      } else {
        length = Number(length);

        if (length > remaining) {
          length = remaining;
        }
      } // must be an even number of digits


      var strLen = string.length;
      if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

      if (length > strLen / 2) {
        length = strLen / 2;
      }

      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }

      return i;
    }

    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }

    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }

    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }

    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }

    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }

    Buffer.prototype.write = function write(string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0; // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0; // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset | 0;

        if (isFinite(length)) {
          length = length | 0;
          if (encoding === undefined) encoding = 'utf8';
        } else {
          encoding = length;
          length = undefined;
        } // legacy write(string, encoding, offset, length) - remove in v0.13

      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
      }

      var remaining = this.length - offset;
      if (length === undefined || length > remaining) length = remaining;

      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }

      if (!encoding) encoding = 'utf8';
      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length);

          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length);

          case 'ascii':
            return asciiWrite(this, string, offset, length);

          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length);

          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };

    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };

    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return fromByteArray(buf);
      } else {
        return fromByteArray(buf.slice(start, end));
      }
    }

    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;

      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }

              break;

            case 2:
              secondByte = buf[i + 1];

              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }

          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        res.push(codePoint);
        i += bytesPerSequence;
      }

      return decodeCodePointsArray(res);
    } // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety


    var MAX_ARGUMENTS_LENGTH = 0x1000;

    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;

      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
      } // Decode in chunks to avoid "call stack size exceeded".


      var res = '';
      var i = 0;

      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }

      return res;
    }

    function asciiSlice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
      }

      return ret;
    }

    function latin1Slice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }

      return ret;
    }

    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = '';

      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }

      return out;
    }

    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = '';

      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }

      return res;
    }

    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === undefined ? len : ~~end;

      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }

      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }

      if (end < start) end = start;
      var newBuf;

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, undefined);

        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }

      return newBuf;
    };
    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */


    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
    }

    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      return val;
    };

    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }

      var val = this[offset + --byteLength];
      var mul = 1;

      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul;
      }

      return val;
    };

    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };

    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };

    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };

    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
    };

    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };

    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var i = byteLength;
      var mul = 1;
      var val = this[offset + --i];

      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 0x80)) return this[offset];
      return (0xff - this[offset] + 1) * -1;
    };

    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };

    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };

    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return read(this, offset, true, 23, 4);
    };

    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return read(this, offset, false, 23, 4);
    };

    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return read(this, offset, true, 52, 8);
    };

    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return read(this, offset, false, 52, 8);
    };

    function checkInt(buf, value, offset, ext, max, min) {
      if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
    }

    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var mul = 1;
      var i = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var i = byteLength - 1;
      var mul = 1;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = value & 0xff;
      return offset + 1;
    };

    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffff + value + 1;

      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
      }
    }

    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }

      return offset + 2;
    };

    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 0xff;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }

      return offset + 2;
    };

    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffffffff + value + 1;

      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
      }
    }

    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }

      return offset + 4;
    };

    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }

      return offset + 4;
    };

    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = byteLength - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 0xff + value + 1;
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }

      return offset + 2;
    };

    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 0xff;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }

      return offset + 2;
    };

    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }

      return offset + 4;
    };

    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (value < 0) value = 0xffffffff + value + 1;

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }

      return offset + 4;
    };

    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
      if (offset < 0) throw new RangeError('Index out of range');
    }

    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }

      write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };

    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }

      write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }

      if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
      if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

      if (end > this.length) end = this.length;

      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }

      var len = end - start;
      var i;

      if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
        // ascending copy from start
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
      }

      return len;
    }; // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])


    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }

        if (val.length === 1) {
          var code = val.charCodeAt(0);

          if (code < 256) {
            val = code;
          }
        }

        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }

        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      } // Invalid ranges are not set to a default, so can range check early.


      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }

      if (end <= start) {
        return this;
      }

      start = start >>> 0;
      end = end === undefined ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;

      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
        var len = bytes.length;

        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }

      return this;
    }; // HELPER FUNCTIONS
    // ================


    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

    function base64clean(str) {
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

      if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

      while (str.length % 4 !== 0) {
        str = str + '=';
      }

      return str;
    }

    function stringtrim(str) {
      if (str.trim) return str.trim();
      return str.replace(/^\s+|\s+$/g, '');
    }

    function toHex(n) {
      if (n < 16) return '0' + n.toString(16);
      return n.toString(16);
    }

    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];

      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i); // is surrogate component

        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } // valid lead


            leadSurrogate = codePoint;
            continue;
          } // 2 leads in a row


          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue;
          } // valid surrogate pair


          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }

        leadSurrogate = null; // encode utf8

        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
          throw new Error('Invalid code point');
        }
      }

      return bytes;
    }

    function asciiToBytes(str) {
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
      }

      return byteArray;
    }

    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }

      return byteArray;
    }

    function base64ToBytes(str) {
      return toByteArray(base64clean(str));
    }

    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }

      return i;
    }

    function isnan(val) {
      return val !== val; // eslint-disable-line no-self-compare
    } // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually


    function isBuffer(obj) {
      return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
    }

    function isFastBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
    } // For Node v0.10 support. Remove this eventually.


    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
    }

    const {
      xsd: xsd$1
    } = namespaces;
    const {
      fromCharCode
    } = String; // Regular expression and replacement string to escape N3 strings.
    // Note how we catch invalid unicode sequences separately (they will trigger an error).

    var escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
    var escapeReplacements = {
      '\\': '\\',
      "'": "'",
      '"': '"',
      'n': '\n',
      'r': '\r',
      't': '\t',
      'f': '\f',
      'b': '\b',
      '_': '_',
      '~': '~',
      '.': '.',
      '-': '-',
      '!': '!',
      '$': '$',
      '&': '&',
      '(': '(',
      ')': ')',
      '*': '*',
      '+': '+',
      ',': ',',
      ';': ';',
      '=': '=',
      '/': '/',
      '?': '?',
      '#': '#',
      '@': '@',
      '%': '%'
    };
    var illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
    var lineModeRegExps = {
      _iri: true,
      _unescapedIri: true,
      _unescapedQuote: true,
      _singleQuote: true,
      _langcode: true,
      _blank: true,
      _newline: true,
      _comment: true,
      _whitespace: true,
      _endOfFile: true
    };
    var invalidRegExp = /$0^/; // ## Constructor

    class N3Lexer {
      constructor(options) {
        // ## Regular expressions
        // It's slightly faster to have these as properties than as in-scope variables
        this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/; // IRI with escape sequences; needs sanity check after unescaping

        this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/; // IRI without escape sequences; no unescaping

        this._unescapedQuote = /^"([^"\\\r\n]+)"/; // non-empty string without escape sequences

        this._unescapedApos = /^'([^'\\\r\n]+)'/;
        this._singleQuote = /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/;
        this._singleApos = /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/;
        this._tripleQuote = /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/;
        this._tripleApos = /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/;
        this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i;
        this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/;
        this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<]))/;
        this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<])/;
        this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<]))/;
        this._number = /^[\-+]?(?:\d+\.?\d*([eE](?:[\-\+])?\d+)|\d*\.?\d+)(?=\.?[,;:\s#()\[\]\{\}"'<])/;
        this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<])/;
        this._keyword = /^@[a-z]+(?=[\s#<:])/i;
        this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i;
        this._shortPredicates = /^a(?=[\s()\[\]\{\}"'<])/;
        this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/;
        this._comment = /#([^\n\r]*)/;
        this._whitespace = /^[ \t]+/;
        this._endOfFile = /^(?:#[^\n\r]*)?$/;
        options = options || {}; // In line mode (N-Triples or N-Quads), only simple features may be parsed

        if (this._lineMode = !!options.lineMode) {
          this._n3Mode = false; // Don't tokenize special literals

          for (var key in this) {
            if (!(key in lineModeRegExps) && this[key] instanceof RegExp) this[key] = invalidRegExp;
          }
        } // When not in line mode, enable N3 functionality by default
        else {
            this._n3Mode = options.n3 !== false;
          } // Don't output comment tokens by default


        this._comments = !!options.comments;
      } // ## Private methods
      // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback


      _tokenizeToEnd(callback, inputFinished) {
        // Continue parsing as far as possible; the loop will return eventually
        var input = this._input,
            outputComments = this._comments;

        while (true) {
          // Count and skip whitespace lines
          var whiteSpaceMatch, comment;

          while (whiteSpaceMatch = this._newline.exec(input)) {
            // Try to find a comment
            if (outputComments && (comment = this._comment.exec(whiteSpaceMatch[0]))) callback(null, {
              line: this._line,
              type: 'comment',
              value: comment[1],
              prefix: ''
            }); // Advance the input

            input = input.substr(whiteSpaceMatch[0].length, input.length);
            this._line++;
          } // Skip whitespace on current line


          if (whiteSpaceMatch = this._whitespace.exec(input)) input = input.substr(whiteSpaceMatch[0].length, input.length); // Stop for now if we're at the end

          if (this._endOfFile.test(input)) {
            // If the input is finished, emit EOF
            if (inputFinished) {
              // Try to find a final comment
              if (outputComments && (comment = this._comment.exec(input))) callback(null, {
                line: this._line,
                type: 'comment',
                value: comment[1],
                prefix: ''
              });
              callback(input = null, {
                line: this._line,
                type: 'eof',
                value: '',
                prefix: ''
              });
            }

            return this._input = input;
          } // Look for specific token types based on the first character


          var line = this._line,
              type = '',
              value = '',
              prefix = '',
              firstChar = input[0],
              match = null,
              matchLength = 0,
              inconclusive = false;

          switch (firstChar) {
            case '^':
              // We need at least 3 tokens lookahead to distinguish ^^<IRI> and ^^pre:fixed
              if (input.length < 3) break; // Try to match a type
              else if (input[1] === '^') {
                  this._previousMarker = '^^'; // Move to type IRI or prefixed name

                  input = input.substr(2);

                  if (input[0] !== '<') {
                    inconclusive = true;
                    break;
                  }
                } // If no type, it must be a path expression
                else {
                    if (this._n3Mode) {
                      matchLength = 1;
                      type = '^';
                    }

                    break;
                  }
            // Fall through in case the type is an IRI

            case '<':
              // Try to find a full IRI without escape sequences
              if (match = this._unescapedIri.exec(input)) type = 'IRI', value = match[1]; // Try to find a full IRI with escape sequences
              else if (match = this._iri.exec(input)) {
                  value = this._unescape(match[1]);
                  if (value === null || illegalIriChars.test(value)) return reportSyntaxError(this);
                  type = 'IRI';
                } // Try to find a backwards implication arrow
                else if (this._n3Mode && input.length > 1 && input[1] === '=') type = 'inverse', matchLength = 2, value = '>';
              break;

            case '_':
              // Try to find a blank node. Since it can contain (but not end with) a dot,
              // we always need a non-dot character before deciding it is a blank node.
              // Therefore, try inserting a space if we're at the end of the input.
              if ((match = this._blank.exec(input)) || inputFinished && (match = this._blank.exec(input + ' '))) type = 'blank', prefix = '_', value = match[1];
              break;

            case '"':
              // Try to find a literal without escape sequences
              if (match = this._unescapedQuote.exec(input)) value = match[1]; // Before attempting more complex string patterns, try to detect a closing quote
              else if (input.indexOf('"', 1) > 0) {
                  // Try to find any other literal wrapped in a pair of quotes
                  if (match = this._singleQuote.exec(input)) value = this._unescape(match[1]); // Try to find a literal wrapped in three pairs of quotes
                  else if (match = this._tripleQuote.exec(input)) {
                      value = match[1]; // Advance line counter

                      this._line += value.split(/\r\n|\r|\n/).length - 1;
                      value = this._unescape(value);
                    }
                  if (value === null) return reportSyntaxError(this);
                }
              if (match !== null) type = 'literal';
              break;

            case "'":
              // Try to find a literal without escape sequences
              if (match = this._unescapedApos.exec(input)) value = match[1]; // Before attempting more complex string patterns, try to detect a closing apostrophe
              else if (input.indexOf("'", 1) > 0) {
                  // Try to find any other literal wrapped in a pair of apostrophes
                  if (match = this._singleApos.exec(input)) value = this._unescape(match[1]); // Try to find a literal wrapped in three pairs of apostrophes
                  else if (match = this._tripleApos.exec(input)) {
                      value = match[1]; // Advance line counter

                      this._line += value.split(/\r\n|\r|\n/).length - 1;
                      value = this._unescape(value);
                    }
                  if (value === null) return reportSyntaxError(this);
                }
              if (match !== null) type = 'literal';
              break;

            case '?':
              // Try to find a variable
              if (this._n3Mode && (match = this._variable.exec(input))) type = 'var', value = match[0];
              break;

            case '@':
              // Try to find a language code
              if (this._previousMarker === 'literal' && (match = this._langcode.exec(input))) type = 'langcode', value = match[1]; // Try to find a keyword
              else if (match = this._keyword.exec(input)) type = match[0];
              break;

            case '.':
              // Try to find a dot as punctuation
              if (input.length === 1 ? inputFinished : input[1] < '0' || input[1] > '9') {
                type = '.';
                matchLength = 1;
                break;
              }

            // Fall through to numerical case (could be a decimal dot)

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '+':
            case '-':
              // Try to find a number. Since it can contain (but not end with) a dot,
              // we always need a non-dot character before deciding it is a number.
              // Therefore, try inserting a space if we're at the end of the input.
              if (match = this._number.exec(input) || inputFinished && (match = this._number.exec(input + ' '))) {
                type = 'literal', value = match[0];
                prefix = match[1] ? xsd$1.double : /^[+\-]?\d+$/.test(match[0]) ? xsd$1.integer : xsd$1.decimal;
              }

              break;

            case 'B':
            case 'b':
            case 'p':
            case 'P':
            case 'G':
            case 'g':
              // Try to find a SPARQL-style keyword
              if (match = this._sparqlKeyword.exec(input)) type = match[0].toUpperCase();else inconclusive = true;
              break;

            case 'f':
            case 't':
              // Try to match a boolean
              if (match = this._boolean.exec(input)) type = 'literal', value = match[0], prefix = xsd$1.boolean;else inconclusive = true;
              break;

            case 'a':
              // Try to find an abbreviated predicate
              if (match = this._shortPredicates.exec(input)) type = 'abbreviation', value = 'a';else inconclusive = true;
              break;

            case '=':
              // Try to find an implication arrow or equals sign
              if (this._n3Mode && input.length > 1) {
                type = 'abbreviation';
                if (input[1] !== '>') matchLength = 1, value = '=';else matchLength = 2, value = '>';
              }

              break;

            case '!':
              if (!this._n3Mode) break;

            case ',':
            case ';':
            case '[':
            case ']':
            case '(':
            case ')':
            case '{':
            case '}':
              if (!this._lineMode) {
                matchLength = 1;
                type = firstChar;
              }

              break;

            default:
              inconclusive = true;
          } // Some first characters do not allow an immediate decision, so inspect more


          if (inconclusive) {
            // Try to find a prefix
            if ((this._previousMarker === '@prefix' || this._previousMarker === 'PREFIX') && (match = this._prefix.exec(input))) type = 'prefix', value = match[1] || ''; // Try to find a prefixed name. Since it can contain (but not end with) a dot,
            // we always need a non-dot character before deciding it is a prefixed name.
            // Therefore, try inserting a space if we're at the end of the input.
            else if ((match = this._prefixed.exec(input)) || inputFinished && (match = this._prefixed.exec(input + ' '))) type = 'prefixed', prefix = match[1] || '', value = this._unescape(match[2]);
          } // A type token is special: it can only be emitted after an IRI or prefixed name is read


          if (this._previousMarker === '^^') {
            switch (type) {
              case 'prefixed':
                type = 'type';
                break;

              case 'IRI':
                type = 'typeIRI';
                break;

              default:
                type = '';
            }
          } // What if nothing of the above was found?


          if (!type) {
            // We could be in streaming mode, and then we just wait for more input to arrive.
            // Otherwise, a syntax error has occurred in the input.
            // One exception: error on an unaccounted linebreak (= not inside a triple-quoted literal).
            if (inputFinished || !/^'''|^"""/.test(input) && /\n|\r/.test(input)) return reportSyntaxError(this);else return this._input = input;
          } // Emit the parsed token


          var token = {
            line: line,
            type: type,
            value: value,
            prefix: prefix
          };
          callback(null, token);
          this.previousToken = token;
          this._previousMarker = type; // Advance to next part to tokenize

          input = input.substr(matchLength || match[0].length, input.length);
        } // Signals the syntax error through the callback


        function reportSyntaxError(self) {
          callback(self._syntaxError(/^\S*/.exec(input)[0]));
        }
      } // ### `_unescape` replaces N3 escape codes by their corresponding characters


      _unescape(item) {
        try {
          return item.replace(escapeSequence, function (sequence, unicode4, unicode8, escapedChar) {
            var charCode;

            if (unicode4) {
              charCode = parseInt(unicode4, 16);
              if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance

              return fromCharCode(charCode);
            } else if (unicode8) {
              charCode = parseInt(unicode8, 16);
              if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance

              if (charCode <= 0xFFFF) return fromCharCode(charCode);
              return fromCharCode(0xD800 + (charCode -= 0x10000) / 0x400, 0xDC00 + (charCode & 0x3FF));
            } else {
              var replacement = escapeReplacements[escapedChar];
              if (!replacement) throw new Error();
              return replacement;
            }
          });
        } catch (error) {
          return null;
        }
      } // ### `_syntaxError` creates a syntax error for the given issue


      _syntaxError(issue) {
        this._input = null;
        var err = new Error('Unexpected "' + issue + '" on line ' + this._line + '.');
        err.context = {
          token: undefined,
          line: this._line,
          previousToken: this.previousToken
        };
        return err;
      } // ## Public methods
      // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
      // The input can be a string or a stream.


      tokenize(input, callback) {
        var self = this;
        this._line = 1; // If the input is a string, continuously emit tokens through the callback until the end

        if (typeof input === 'string') {
          this._input = input; // If a callback was passed, asynchronously call it

          if (typeof callback === 'function') setImmediate(function () {
            self._tokenizeToEnd(callback, true);
          }); // If no callback was passed, tokenize synchronously and return
          else {
              var tokens = [],
                  error;

              this._tokenizeToEnd(function (e, t) {
                e ? error = e : tokens.push(t);
              }, true);

              if (error) throw error;
              return tokens;
            }
        } // Otherwise, the input must be a stream
        else {
            this._input = '';
            this._pendingBuffer = null;
            if (typeof input.setEncoding === 'function') input.setEncoding('utf8'); // Adds the data chunk to the buffer and parses as far as possible

            input.on('data', function (data) {
              if (self._input !== null && data.length !== 0) {
                // Prepend any previous pending writes
                if (self._pendingBuffer) {
                  data = Buffer.concat([self._pendingBuffer, data]);
                  self._pendingBuffer = null;
                } // Hold if the buffer ends in an incomplete unicode sequence


                if (data[data.length - 1] & 0x80) {
                  self._pendingBuffer = data;
                } // Otherwise, tokenize as far as possible
                else {
                    self._input += data;

                    self._tokenizeToEnd(callback, false);
                  }
              }
            }); // Parses until the end

            input.on('end', function () {
              if (self._input !== null) self._tokenizeToEnd(callback, true);
            });
            input.on('error', callback);
          }
      }

    }

    // **N3Parser** parses N3 documents.

    var blankNodePrefix = 0,
        blankNodeCount = 0; // ## Constructor

    class N3Parser {
      constructor(options) {
        this._contextStack = [];
        this._graph = null; // Set the document IRI

        options = options || {};

        this._setBase(options.baseIRI);

        options.factory && initDataFactory(this, options.factory); // Set supported features depending on the format

        var format = typeof options.format === 'string' ? options.format.match(/\w*$/)[0].toLowerCase() : '',
            isTurtle = format === 'turtle',
            isTriG = format === 'trig',
            isNTriples = /triple/.test(format),
            isNQuads = /quad/.test(format),
            isN3 = this._n3Mode = /n3/.test(format),
            isLineMode = isNTriples || isNQuads;
        if (!(this._supportsNamedGraphs = !(isTurtle || isN3))) this._readPredicateOrNamedGraph = this._readPredicate;
        this._supportsQuads = !(isTurtle || isTriG || isNTriples || isN3); // Disable relative IRIs in N-Triples or N-Quads mode

        if (isLineMode) this._resolveRelativeIRI = function (iri) {
          return '';
        };
        this._blankNodePrefix = typeof options.blankNodePrefix !== 'string' ? '' : options.blankNodePrefix.replace(/^(?!_:)/, '_:');
        this._lexer = options.lexer || new N3Lexer({
          lineMode: isLineMode,
          n3: isN3
        }); // Disable explicit quantifiers by default

        this._explicitQuantifiers = !!options.explicitQuantifiers;
      } // ## Static class methods
      // ### `_resetBlankNodeIds` restarts blank node identification


      static _resetBlankNodeIds() {
        blankNodePrefix = blankNodeCount = 0;
      } // ## Private methods
      // ### `_blank` creates a new blank node


      _blank() {
        return this._blankNode('b' + blankNodeCount++);
      } // ### `_setBase` sets the base IRI to resolve relative IRIs


      _setBase(baseIRI) {
        if (!baseIRI) {
          this._base = '';
          this._basePath = '';
        } else {
          // Remove fragment if present
          var fragmentPos = baseIRI.indexOf('#');
          if (fragmentPos >= 0) baseIRI = baseIRI.substr(0, fragmentPos); // Set base IRI and its components

          this._base = baseIRI;
          this._basePath = baseIRI.indexOf('/') < 0 ? baseIRI : baseIRI.replace(/[^\/?]*(?:\?.*)?$/, '');
          baseIRI = baseIRI.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i);
          this._baseRoot = baseIRI[0];
          this._baseScheme = baseIRI[1];
        }
      } // ### `_saveContext` stores the current parsing context
      // when entering a new scope (list, blank node, formula)


      _saveContext(type, graph, subject, predicate, object) {
        var n3Mode = this._n3Mode;

        this._contextStack.push({
          subject: subject,
          predicate: predicate,
          object: object,
          graph: graph,
          type: type,
          inverse: n3Mode ? this._inversePredicate : false,
          blankPrefix: n3Mode ? this._prefixes._ : '',
          quantified: n3Mode ? this._quantified : null
        }); // The settings below only apply to N3 streams


        if (n3Mode) {
          // Every new scope resets the predicate direction
          this._inversePredicate = false; // In N3, blank nodes are scoped to a formula
          // (using a dot as separator, as a blank node label cannot start with it)

          this._prefixes._ = this._graph ? this._graph.id.substr(2) + '.' : '.'; // Quantifiers are scoped to a formula

          this._quantified = Object.create(this._quantified);
        }
      } // ### `_restoreContext` restores the parent context
      // when leaving a scope (list, blank node, formula)


      _restoreContext() {
        var context = this._contextStack.pop(),
            n3Mode = this._n3Mode;

        this._subject = context.subject;
        this._predicate = context.predicate;
        this._object = context.object;
        this._graph = context.graph; // The settings below only apply to N3 streams

        if (n3Mode) {
          this._inversePredicate = context.inverse;
          this._prefixes._ = context.blankPrefix;
          this._quantified = context.quantified;
        }
      } // ### `_readInTopContext` reads a token when in the top context


      _readInTopContext(token) {
        switch (token.type) {
          // If an EOF token arrives in the top context, signal that we're done
          case 'eof':
            if (this._graph !== null) return this._error('Unclosed graph', token);
            delete this._prefixes._;
            return this._callback(null, null, this._prefixes);
          // It could be a prefix declaration

          case 'PREFIX':
            this._sparqlStyle = true;

          case '@prefix':
            return this._readPrefix;
          // It could be a base declaration

          case 'BASE':
            this._sparqlStyle = true;

          case '@base':
            return this._readBaseIRI;
          // It could be a graph

          case '{':
            if (this._supportsNamedGraphs) {
              this._graph = '';
              this._subject = null;
              return this._readSubject;
            }

          case 'GRAPH':
            if (this._supportsNamedGraphs) return this._readNamedGraphLabel;
          // Otherwise, the next token must be a subject

          default:
            return this._readSubject(token);
        }
      } // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable


      _readEntity(token, quantifier) {
        var value;

        switch (token.type) {
          // Read a relative or absolute IRI
          case 'IRI':
          case 'typeIRI':
            var iri = this._resolveIRI(token.value);

            if (iri === '') return this._error('Invalid IRI', token);
            value = this._namedNode(iri);
            break;
          // Read a prefixed name

          case 'type':
          case 'prefixed':
            var prefix = this._prefixes[token.prefix];
            if (prefix === undefined) return this._error('Undefined prefix "' + token.prefix + ':"', token);
            value = this._namedNode(prefix + token.value);
            break;
          // Read a blank node

          case 'blank':
            value = this._blankNode(this._prefixes[token.prefix] + token.value);
            break;
          // Read a variable

          case 'var':
            value = this._variable(token.value.substr(1));
            break;
          // Everything else is not an entity

          default:
            return this._error('Expected entity but got ' + token.type, token);
        } // In N3 mode, replace the entity if it is quantified


        if (!quantifier && this._n3Mode && value.id in this._quantified) value = this._quantified[value.id];
        return value;
      } // ### `_readSubject` reads a quad's subject


      _readSubject(token) {
        this._predicate = null;

        switch (token.type) {
          case '[':
            // Start a new quad with a new blank node as subject
            this._saveContext('blank', this._graph, this._subject = this._blank(), null, null);

            return this._readBlankNodeHead;

          case '(':
            // Start a new list
            this._saveContext('list', this._graph, this.RDF_NIL, null, null);

            this._subject = null;
            return this._readListItem;

          case '{':
            // Start a new formula
            if (!this._n3Mode) return this._error('Unexpected graph', token);

            this._saveContext('formula', this._graph, this._graph = this._blank(), null, null);

            return this._readSubject;

          case '}':
            // No subject; the graph in which we are reading is closed instead
            return this._readPunctuation(token);

          case '@forSome':
            if (!this._n3Mode) return this._error('Unexpected "@forSome"', token);
            this._subject = null;
            this._predicate = this.N3_FORSOME;
            this._quantifier = this._blankNode;
            return this._readQuantifierList;

          case '@forAll':
            if (!this._n3Mode) return this._error('Unexpected "@forAll"', token);
            this._subject = null;
            this._predicate = this.N3_FORALL;
            this._quantifier = this._variable;
            return this._readQuantifierList;

          default:
            // Read the subject entity
            if ((this._subject = this._readEntity(token)) === undefined) return; // In N3 mode, the subject might be a path

            if (this._n3Mode) return this._getPathReader(this._readPredicateOrNamedGraph);
        } // The next token must be a predicate,
        // or, if the subject was actually a graph IRI, a named graph


        return this._readPredicateOrNamedGraph;
      } // ### `_readPredicate` reads a quad's predicate


      _readPredicate(token) {
        var type = token.type;

        switch (type) {
          case 'inverse':
            this._inversePredicate = true;

          case 'abbreviation':
            this._predicate = this.ABBREVIATIONS[token.value];
            break;

          case '.':
          case ']':
          case '}':
            // Expected predicate didn't come, must have been trailing semicolon
            if (this._predicate === null) return this._error('Unexpected ' + type, token);
            this._subject = null;
            return type === ']' ? this._readBlankNodeTail(token) : this._readPunctuation(token);

          case ';':
            // Additional semicolons can be safely ignored
            return this._predicate !== null ? this._readPredicate : this._error('Expected predicate but got ;', token);

          case 'blank':
            if (!this._n3Mode) return this._error('Disallowed blank node as predicate', token);

          default:
            if ((this._predicate = this._readEntity(token)) === undefined) return;
        } // The next token must be an object


        return this._readObject;
      } // ### `_readObject` reads a quad's object


      _readObject(token) {
        switch (token.type) {
          case 'literal':
            // Regular literal, can still get a datatype or language
            if (token.prefix.length === 0) {
              this._literalValue = token.value;
              return this._readDataTypeOrLang;
            } // Pre-datatyped string literal (prefix stores the datatype)
            else this._object = this._literal(token.value, this._namedNode(token.prefix));

            break;

          case '[':
            // Start a new quad with a new blank node as subject
            this._saveContext('blank', this._graph, this._subject, this._predicate, this._subject = this._blank());

            return this._readBlankNodeHead;

          case '(':
            // Start a new list
            this._saveContext('list', this._graph, this._subject, this._predicate, this.RDF_NIL);

            this._subject = null;
            return this._readListItem;

          case '{':
            // Start a new formula
            if (!this._n3Mode) return this._error('Unexpected graph', token);

            this._saveContext('formula', this._graph, this._subject, this._predicate, this._graph = this._blank());

            return this._readSubject;

          default:
            // Read the object entity
            if ((this._object = this._readEntity(token)) === undefined) return; // In N3 mode, the object might be a path

            if (this._n3Mode) return this._getPathReader(this._getContextEndReader());
        }

        return this._getContextEndReader();
      } // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph


      _readPredicateOrNamedGraph(token) {
        return token.type === '{' ? this._readGraph(token) : this._readPredicate(token);
      } // ### `_readGraph` reads a graph


      _readGraph(token) {
        if (token.type !== '{') return this._error('Expected graph but got ' + token.type, token); // The "subject" we read is actually the GRAPH's label

        this._graph = this._subject, this._subject = null;
        return this._readSubject;
      } // ### `_readBlankNodeHead` reads the head of a blank node


      _readBlankNodeHead(token) {
        if (token.type === ']') {
          this._subject = null;
          return this._readBlankNodeTail(token);
        } else {
          this._predicate = null;
          return this._readPredicate(token);
        }
      } // ### `_readBlankNodeTail` reads the end of a blank node


      _readBlankNodeTail(token) {
        if (token.type !== ']') return this._readBlankNodePunctuation(token); // Store blank node quad

        if (this._subject !== null) this._emit(this._subject, this._predicate, this._object, this._graph); // Restore the parent context containing this blank node

        var empty = this._predicate === null;

        this._restoreContext(); // If the blank node was the subject, continue reading the predicate


        if (this._object === null) // If the blank node was empty, it could be a named graph label
          return empty ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank; // If the blank node was the object, restore previous context and read punctuation
        else return this._getContextEndReader();
      } // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node


      _readPredicateAfterBlank(token) {
        switch (token.type) {
          case '.':
          case '}':
            // No predicate is coming if the triple is terminated here
            this._subject = null;
            return this._readPunctuation(token);

          default:
            return this._readPredicate(token);
        }
      } // ### `_readListItem` reads items from a list


      _readListItem(token) {
        var item = null,
            // The item of the list
        list = null,
            // The list itself
        previousList = this._subject,
            // The previous list that contains this list
        stack = this._contextStack,
            // The stack of parent contexts
        parent = stack[stack.length - 1],
            // The parent containing the current list
        next = this._readListItem; // The next function to execute

        switch (token.type) {
          case '[':
            // Stack the current list quad and start a new quad with a blank node as subject
            this._saveContext('blank', this._graph, list = this._blank(), this.RDF_FIRST, this._subject = item = this._blank());

            next = this._readBlankNodeHead;
            break;

          case '(':
            // Stack the current list quad and start a new list
            this._saveContext('list', this._graph, list = this._blank(), this.RDF_FIRST, this.RDF_NIL);

            this._subject = null;
            break;

          case ')':
            // Closing the list; restore the parent context
            this._restoreContext(); // If this list is contained within a parent list, return the membership quad here.
            // This will be `<parent list element> rdf:first <this list>.`.


            if (stack.length !== 0 && stack[stack.length - 1].type === 'list') this._emit(this._subject, this._predicate, this._object, this._graph); // Was this list the parent's subject?

            if (this._predicate === null) {
              // The next token is the predicate
              next = this._readPredicate; // No list tail if this was an empty list

              if (this._subject === this.RDF_NIL) return next;
            } // The list was in the parent context's object
            else {
                next = this._getContextEndReader(); // No list tail if this was an empty list

                if (this._object === this.RDF_NIL) return next;
              } // Close the list by making the head nil


            list = this.RDF_NIL;
            break;

          case 'literal':
            // Regular literal, can still get a datatype or language
            if (token.prefix.length === 0) {
              this._literalValue = token.value;
              next = this._readListItemDataTypeOrLang;
            } // Pre-datatyped string literal (prefix stores the datatype)
            else {
                item = this._literal(token.value, this._namedNode(token.prefix));
                next = this._getContextEndReader();
              }

            break;

          default:
            if ((item = this._readEntity(token)) === undefined) return;
        } // Create a new blank node if no item head was assigned yet


        if (list === null) this._subject = list = this._blank(); // Is this the first element of the list?

        if (previousList === null) {
          // This list is either the subject or the object of its parent
          if (parent.predicate === null) parent.subject = list;else parent.object = list;
        } else {
          // Continue the previous list with the current list
          this._emit(previousList, this.RDF_REST, list, this._graph);
        } // If an item was read, add it to the list


        if (item !== null) {
          // In N3 mode, the item might be a path
          if (this._n3Mode && (token.type === 'IRI' || token.type === 'prefixed')) {
            // Create a new context to add the item's path
            this._saveContext('item', this._graph, list, this.RDF_FIRST, item);

            this._subject = item, this._predicate = null; // _readPath will restore the context and output the item

            return this._getPathReader(this._readListItem);
          } // Output the item


          this._emit(list, this.RDF_FIRST, item, this._graph);
        }

        return next;
      } // ### `_readDataTypeOrLang` reads an _optional_ datatype or language


      _readDataTypeOrLang(token) {
        return this._completeLiteral(token, false);
      } // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list


      _readListItemDataTypeOrLang(token) {
        return this._completeLiteral(token, true);
      } // ### `_completeLiteral` completes a literal with an optional datatype or language


      _completeLiteral(token, listItem) {
        switch (token.type) {
          // Create a datatyped literal
          case 'type':
          case 'typeIRI':
            var datatype = this._readEntity(token);

            if (datatype === undefined) return; // No datatype means an error occurred

            this._object = this._literal(this._literalValue, datatype);
            token = null;
            break;
          // Create a language-tagged string

          case 'langcode':
            this._object = this._literal(this._literalValue, token.value);
            token = null;
            break;
          // Create a simple string literal

          default:
            this._object = this._literal(this._literalValue);
        } // If this literal was part of a list, write the item
        // (we could also check the context stack, but passing in a flag is faster)


        if (listItem) this._emit(this._subject, this.RDF_FIRST, this._object, this._graph); // If the token was consumed, continue with the rest of the input

        if (token === null) return this._getContextEndReader(); // Otherwise, consume the token now
        else {
            this._readCallback = this._getContextEndReader();
            return this._readCallback(token);
          }
      } // ### `_readFormulaTail` reads the end of a formula


      _readFormulaTail(token) {
        if (token.type !== '}') return this._readPunctuation(token); // Store the last quad of the formula

        if (this._subject !== null) this._emit(this._subject, this._predicate, this._object, this._graph); // Restore the parent context containing this formula

        this._restoreContext(); // If the formula was the subject, continue reading the predicate.
        // If the formula was the object, read punctuation.


        return this._object === null ? this._readPredicate : this._getContextEndReader();
      } // ### `_readPunctuation` reads punctuation between quads or quad parts


      _readPunctuation(token) {
        var next,
            subject = this._subject,
            graph = this._graph,
            inversePredicate = this._inversePredicate;

        switch (token.type) {
          // A closing brace ends a graph
          case '}':
            if (this._graph === null) return this._error('Unexpected graph closing', token);
            if (this._n3Mode) return this._readFormulaTail(token);
            this._graph = null;
          // A dot just ends the statement, without sharing anything with the next

          case '.':
            this._subject = null;
            next = this._contextStack.length ? this._readSubject : this._readInTopContext;
            if (inversePredicate) this._inversePredicate = false;
            break;
          // Semicolon means the subject is shared; predicate and object are different

          case ';':
            next = this._readPredicate;
            break;
          // Comma means both the subject and predicate are shared; the object is different

          case ',':
            next = this._readObject;
            break;

          default:
            // An entity means this is a quad (only allowed if not already inside a graph)
            if (this._supportsQuads && this._graph === null && (graph = this._readEntity(token)) !== undefined) {
              next = this._readQuadPunctuation;
              break;
            }

            return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
        } // A quad has been completed now, so return it


        if (subject !== null) {
          var predicate = this._predicate,
              object = this._object;
          if (!inversePredicate) this._emit(subject, predicate, object, graph);else this._emit(object, predicate, subject, graph);
        }

        return next;
      } // ### `_readBlankNodePunctuation` reads punctuation in a blank node


      _readBlankNodePunctuation(token) {
        var next;

        switch (token.type) {
          // Semicolon means the subject is shared; predicate and object are different
          case ';':
            next = this._readPredicate;
            break;
          // Comma means both the subject and predicate are shared; the object is different

          case ',':
            next = this._readObject;
            break;

          default:
            return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
        } // A quad has been completed now, so return it


        this._emit(this._subject, this._predicate, this._object, this._graph);

        return next;
      } // ### `_readQuadPunctuation` reads punctuation after a quad


      _readQuadPunctuation(token) {
        if (token.type !== '.') return this._error('Expected dot to follow quad', token);
        return this._readInTopContext;
      } // ### `_readPrefix` reads the prefix of a prefix declaration


      _readPrefix(token) {
        if (token.type !== 'prefix') return this._error('Expected prefix to follow @prefix', token);
        this._prefix = token.value;
        return this._readPrefixIRI;
      } // ### `_readPrefixIRI` reads the IRI of a prefix declaration


      _readPrefixIRI(token) {
        if (token.type !== 'IRI') return this._error('Expected IRI to follow prefix "' + this._prefix + ':"', token);

        var prefixNode = this._readEntity(token);

        this._prefixes[this._prefix] = prefixNode.value;

        this._prefixCallback(this._prefix, prefixNode);

        return this._readDeclarationPunctuation;
      } // ### `_readBaseIRI` reads the IRI of a base declaration


      _readBaseIRI(token) {
        var iri = token.type === 'IRI' && this._resolveIRI(token.value);

        if (!iri) return this._error('Expected valid IRI to follow base declaration', token);

        this._setBase(iri);

        return this._readDeclarationPunctuation;
      } // ### `_readNamedGraphLabel` reads the label of a named graph


      _readNamedGraphLabel(token) {
        switch (token.type) {
          case 'IRI':
          case 'blank':
          case 'prefixed':
            return this._readSubject(token), this._readGraph;

          case '[':
            return this._readNamedGraphBlankLabel;

          default:
            return this._error('Invalid graph label', token);
        }
      } // ### `_readNamedGraphLabel` reads a blank node label of a named graph


      _readNamedGraphBlankLabel(token) {
        if (token.type !== ']') return this._error('Invalid graph label', token);
        this._subject = this._blank();
        return this._readGraph;
      } // ### `_readDeclarationPunctuation` reads the punctuation of a declaration


      _readDeclarationPunctuation(token) {
        // SPARQL-style declarations don't have punctuation
        if (this._sparqlStyle) {
          this._sparqlStyle = false;
          return this._readInTopContext(token);
        }

        if (token.type !== '.') return this._error('Expected declaration to end with a dot', token);
        return this._readInTopContext;
      } // Reads a list of quantified symbols from a @forSome or @forAll statement


      _readQuantifierList(token) {
        var entity;

        switch (token.type) {
          case 'IRI':
          case 'prefixed':
            if ((entity = this._readEntity(token, true)) !== undefined) break;

          default:
            return this._error('Unexpected ' + token.type, token);
        } // Without explicit quantifiers, map entities to a quantified entity


        if (!this._explicitQuantifiers) this._quantified[entity.id] = this._quantifier('b' + blankNodeCount++); // With explicit quantifiers, output the reified quantifier
        else {
            // If this is the first item, start a new quantifier list
            if (this._subject === null) this._emit(this._graph || this.DEFAULTGRAPH, this._predicate, this._subject = this._blank(), this.QUANTIFIERS_GRAPH); // Otherwise, continue the previous list
            else this._emit(this._subject, this.RDF_REST, this._subject = this._blank(), this.QUANTIFIERS_GRAPH); // Output the list item

            this._emit(this._subject, this.RDF_FIRST, entity, this.QUANTIFIERS_GRAPH);
          }
        return this._readQuantifierPunctuation;
      } // Reads punctuation from a @forSome or @forAll statement


      _readQuantifierPunctuation(token) {
        // Read more quantifiers
        if (token.type === ',') return this._readQuantifierList; // End of the quantifier list
        else {
            // With explicit quantifiers, close the quantifier list
            if (this._explicitQuantifiers) {
              this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH);

              this._subject = null;
            } // Read a dot


            this._readCallback = this._getContextEndReader();
            return this._readCallback(token);
          }
      } // ### `_getPathReader` reads a potential path and then resumes with the given function


      _getPathReader(afterPath) {
        this._afterPath = afterPath;
        return this._readPath;
      } // ### `_readPath` reads a potential path


      _readPath(token) {
        switch (token.type) {
          // Forward path
          case '!':
            return this._readForwardPath;
          // Backward path

          case '^':
            return this._readBackwardPath;
          // Not a path; resume reading where we left off

          default:
            var stack = this._contextStack,
                parent = stack.length && stack[stack.length - 1]; // If we were reading a list item, we still need to output it

            if (parent && parent.type === 'item') {
              // The list item is the remaining subejct after reading the path
              var item = this._subject; // Switch back to the context of the list

              this._restoreContext(); // Output the list item


              this._emit(this._subject, this.RDF_FIRST, item, this._graph);
            }

            return this._afterPath(token);
        }
      } // ### `_readForwardPath` reads a '!' path


      _readForwardPath(token) {
        var subject,
            predicate,
            object = this._blank(); // The next token is the predicate


        if ((predicate = this._readEntity(token)) === undefined) return; // If we were reading a subject, replace the subject by the path's object

        if (this._predicate === null) subject = this._subject, this._subject = object; // If we were reading an object, replace the subject by the path's object
        else subject = this._object, this._object = object; // Emit the path's current quad and read its next section

        this._emit(subject, predicate, object, this._graph);

        return this._readPath;
      } // ### `_readBackwardPath` reads a '^' path


      _readBackwardPath(token) {
        var subject = this._blank(),
            predicate,
            object; // The next token is the predicate


        if ((predicate = this._readEntity(token)) === undefined) return; // If we were reading a subject, replace the subject by the path's subject

        if (this._predicate === null) object = this._subject, this._subject = subject; // If we were reading an object, replace the subject by the path's subject
        else object = this._object, this._object = subject; // Emit the path's current quad and read its next section

        this._emit(subject, predicate, object, this._graph);

        return this._readPath;
      } // ### `_getContextEndReader` gets the next reader function at the end of a context


      _getContextEndReader() {
        var contextStack = this._contextStack;
        if (!contextStack.length) return this._readPunctuation;

        switch (contextStack[contextStack.length - 1].type) {
          case 'blank':
            return this._readBlankNodeTail;

          case 'list':
            return this._readListItem;

          case 'formula':
            return this._readFormulaTail;
        }
      } // ### `_emit` sends a quad through the callback


      _emit(subject, predicate, object, graph) {
        this._callback(null, this._quad(subject, predicate, object, graph || this.DEFAULTGRAPH));
      } // ### `_error` emits an error message through the callback


      _error(message, token) {
        var err = new Error(message + ' on line ' + token.line + '.');
        err.context = {
          token: token,
          line: token.line,
          previousToken: this._lexer.previousToken
        };

        this._callback(err);

        this._callback = noop;
      } // ### `_resolveIRI` resolves an IRI against the base path


      _resolveIRI(iri) {
        return /^[a-z][a-z0-9+.-]*:/i.test(iri) ? iri : this._resolveRelativeIRI(iri);
      } // ### `_resolveRelativeIRI` resolves an IRI against the base path,
      // assuming that a base path has been set and that the IRI is indeed relative


      _resolveRelativeIRI(iri) {
        // An empty relative IRI indicates the base IRI
        if (!iri.length) return this._base; // Decide resolving strategy based in the first character

        switch (iri[0]) {
          // Resolve relative fragment IRIs against the base IRI
          case '#':
            return this._base + iri;
          // Resolve relative query string IRIs by replacing the query string

          case '?':
            return this._base.replace(/(?:\?.*)?$/, iri);
          // Resolve root-relative IRIs at the root of the base IRI

          case '/':
            // Resolve scheme-relative IRIs to the scheme
            return (iri[1] === '/' ? this._baseScheme : this._baseRoot) + this._removeDotSegments(iri);
          // Resolve all other IRIs at the base IRI's path

          default:
            // Relative IRIs cannot contain a colon in the first path segment
            return /^[^/:]*:/.test(iri) ? '' : this._removeDotSegments(this._basePath + iri);
        }
      } // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986


      _removeDotSegments(iri) {
        // Don't modify the IRI if it does not contain any dot segments
        if (!/(^|\/)\.\.?($|[/#?])/.test(iri)) return iri; // Start with an imaginary slash before the IRI in order to resolve trailing './' and '../'

        var result = '',
            length = iri.length,
            i = -1,
            pathStart = -1,
            segmentStart = 0,
            next = '/';

        while (i < length) {
          switch (next) {
            // The path starts with the first slash after the authority
            case ':':
              if (pathStart < 0) {
                // Skip two slashes before the authority
                if (iri[++i] === '/' && iri[++i] === '/') // Skip to slash after the authority
                  while ((pathStart = i + 1) < length && iri[pathStart] !== '/') i = pathStart;
              }

              break;
            // Don't modify a query string or fragment

            case '?':
            case '#':
              i = length;
              break;
            // Handle '/.' or '/..' path segments

            case '/':
              if (iri[i + 1] === '.') {
                next = iri[++i + 1];

                switch (next) {
                  // Remove a '/.' segment
                  case '/':
                    result += iri.substring(segmentStart, i - 1);
                    segmentStart = i + 1;
                    break;
                  // Remove a trailing '/.' segment

                  case undefined:
                  case '?':
                  case '#':
                    return result + iri.substring(segmentStart, i) + iri.substr(i + 1);
                  // Remove a '/..' segment

                  case '.':
                    next = iri[++i + 1];

                    if (next === undefined || next === '/' || next === '?' || next === '#') {
                      result += iri.substring(segmentStart, i - 2); // Try to remove the parent path from result

                      if ((segmentStart = result.lastIndexOf('/')) >= pathStart) result = result.substr(0, segmentStart); // Remove a trailing '/..' segment

                      if (next !== '/') return result + '/' + iri.substr(i + 1);
                      segmentStart = i + 1;
                    }

                }
              }

          }

          next = iri[++i];
        }

        return result + iri.substring(segmentStart);
      } // ## Public methods
      // ### `parse` parses the N3 input and emits each parsed quad through the callback


      parse(input, quadCallback, prefixCallback) {
        var self = this; // The read callback is the next function to be executed when a token arrives.
        // We start reading in the top context.

        this._readCallback = this._readInTopContext;
        this._sparqlStyle = false;
        this._prefixes = Object.create(null);
        this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : 'b' + blankNodePrefix++ + '_';
        this._prefixCallback = prefixCallback || noop;
        this._inversePredicate = false;
        this._quantified = Object.create(null); // Parse synchronously if no quad callback is given

        if (!quadCallback) {
          var quads = [],
              error;

          this._callback = function (e, t) {
            e ? error = e : t && quads.push(t);
          };

          this._lexer.tokenize(input).every(function (token) {
            return self._readCallback = self._readCallback(token);
          });

          if (error) throw error;
          return quads;
        } // Parse asynchronously otherwise, executing the read callback when a token arrives


        this._callback = quadCallback;

        this._lexer.tokenize(input, function (error, token) {
          if (error !== null) self._callback(error), self._callback = noop;else if (self._readCallback) self._readCallback = self._readCallback(token);
        });
      }

    } // The empty function

    function noop() {} // Initializes the parser with the given data factory


    function initDataFactory(parser, factory) {
      // Set factory methods
      var namedNode = factory.namedNode;
      parser._namedNode = namedNode;
      parser._blankNode = factory.blankNode;
      parser._literal = factory.literal;
      parser._variable = factory.variable;
      parser._quad = factory.quad;
      parser.DEFAULTGRAPH = factory.defaultGraph(); // Set common named nodes

      parser.RDF_FIRST = namedNode(namespaces.rdf.first);
      parser.RDF_REST = namedNode(namespaces.rdf.rest);
      parser.RDF_NIL = namedNode(namespaces.rdf.nil);
      parser.N3_FORALL = namedNode(namespaces.r.forAll);
      parser.N3_FORSOME = namedNode(namespaces.r.forSome);
      parser.ABBREVIATIONS = {
        'a': namedNode(namespaces.rdf.type),
        '=': namedNode(namespaces.owl.sameAs),
        '>': namedNode(namespaces.log.implies)
      };
      parser.QUANTIFIERS_GRAPH = namedNode('urn:n3:quantifiers');
    }

    initDataFactory(N3Parser.prototype, DataFactory$1);

    // **N3Writer** writes N3 documents.
    const DEFAULTGRAPH$1 = DataFactory$1.defaultGraph();
    const {
      rdf: rdf$1,
      xsd: xsd$2
    } = namespaces; // Characters in literals that require escaping

    var escape = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,
        escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,
        escapedCharacters = {
      '\\': '\\\\',
      '"': '\\"',
      '\t': '\\t',
      '\n': '\\n',
      '\r': '\\r',
      '\b': '\\b',
      '\f': '\\f'
    }; // ## Placeholder class to represent already pretty-printed terms

    class SerializedTerm extends DataFactory$1.internal.Term {
      // Pretty-printed nodes are not equal to any other node
      // (e.g., [] does not equal [])
      equals() {
        return false;
      }

    } // ## Constructor


    class N3Writer {
      constructor(outputStream, options) {
        // ### `_prefixRegex` matches a prefixed name or IRI that begins with one of the added prefixes
        this._prefixRegex = /$0^/; // Shift arguments if the first argument is not a stream

        if (outputStream && typeof outputStream.write !== 'function') options = outputStream, outputStream = null;
        options = options || {};
        this._lists = options.lists; // If no output stream given, send the output as string through the end callback

        if (!outputStream) {
          var output = '';
          this._outputStream = {
            write(chunk, encoding, done) {
              output += chunk;
              done && done();
            },

            end: function (done) {
              done && done(null, output);
            }
          };
          this._endStream = true;
        } else {
          this._outputStream = outputStream;
          this._endStream = options.end === undefined ? true : !!options.end;
        } // Initialize writer, depending on the format


        this._subject = null;

        if (!/triple|quad/i.test(options.format)) {
          this._graph = DEFAULTGRAPH$1;
          this._prefixIRIs = Object.create(null);
          options.prefixes && this.addPrefixes(options.prefixes);
        } else {
          this._writeQuad = this._writeQuadLine;
        }
      } // ## Private methods
      // ### Whether the current graph is the default graph


      get _inDefaultGraph() {
        return DEFAULTGRAPH$1.equals(this._graph);
      } // ### `_write` writes the argument to the output stream


      _write(string, callback) {
        this._outputStream.write(string, 'utf8', callback);
      } // ### `_writeQuad` writes the quad to the output stream


      _writeQuad(subject, predicate, object, graph, done) {
        try {
          // Write the graph's label if it has changed
          if (!graph.equals(this._graph)) {
            // Close the previous graph and start the new one
            this._write((this._subject === null ? '' : this._inDefaultGraph ? '.\n' : '\n}\n') + (DEFAULTGRAPH$1.equals(graph) ? '' : this._encodeIriOrBlank(graph) + ' {\n'));

            this._graph = graph;
            this._subject = null;
          } // Don't repeat the subject if it's the same


          if (subject.equals(this._subject)) {
            // Don't repeat the predicate if it's the same
            if (predicate.equals(this._predicate)) this._write(', ' + this._encodeObject(object), done); // Same subject, different predicate
            else this._write(';\n    ' + this._encodePredicate(this._predicate = predicate) + ' ' + this._encodeObject(object), done);
          } // Different subject; write the whole quad
          else this._write((this._subject === null ? '' : '.\n') + this._encodeIriOrBlank(this._subject = subject) + ' ' + this._encodePredicate(this._predicate = predicate) + ' ' + this._encodeObject(object), done);
        } catch (error) {
          done && done(error);
        }
      } // ### `_writeQuadLine` writes the quad to the output stream as a single line


      _writeQuadLine(subject, predicate, object, graph, done) {
        // Write the quad without prefixes
        delete this._prefixMatch;

        this._write(this.quadToString(subject, predicate, object, graph), done);
      } // ### `quadToString` serializes a quad as a string


      quadToString(subject, predicate, object, graph) {
        return this._encodeIriOrBlank(subject) + ' ' + this._encodeIriOrBlank(predicate) + ' ' + this._encodeObject(object) + (graph && graph.value ? ' ' + this._encodeIriOrBlank(graph) + ' .\n' : ' .\n');
      } // ### `quadsToString` serializes an array of quads as a string


      quadsToString(quads) {
        return quads.map(function (t) {
          return this.quadToString(t.subject, t.predicate, t.object, t.graph);
        }, this).join('');
      } // ### `_encodeIriOrBlank` represents an IRI or blank node


      _encodeIriOrBlank(entity) {
        // A blank node or list is represented as-is
        if (entity.termType !== 'NamedNode') {
          // If it is a list head, pretty-print it
          if (this._lists && entity.value in this._lists) entity = this.list(this._lists[entity.value]);
          return 'id' in entity ? entity.id : '_:' + entity.value;
        } // Escape special characters


        var iri = entity.value;
        if (escape.test(iri)) iri = iri.replace(escapeAll, characterReplacer); // Try to represent the IRI as prefixed name

        var prefixMatch = this._prefixRegex.exec(iri);

        return !prefixMatch ? '<' + iri + '>' : !prefixMatch[1] ? iri : this._prefixIRIs[prefixMatch[1]] + prefixMatch[2];
      } // ### `_encodeLiteral` represents a literal


      _encodeLiteral(literal) {
        // Escape special characters
        var value = literal.value;
        if (escape.test(value)) value = value.replace(escapeAll, characterReplacer); // Write the literal, possibly with type or language

        if (literal.language) return '"' + value + '"@' + literal.language;else if (literal.datatype.value !== xsd$2.string) return '"' + value + '"^^' + this._encodeIriOrBlank(literal.datatype);else return '"' + value + '"';
      } // ### `_encodePredicate` represents a predicate


      _encodePredicate(predicate) {
        return predicate.value === rdf$1.type ? 'a' : this._encodeIriOrBlank(predicate);
      } // ### `_encodeObject` represents an object


      _encodeObject(object) {
        return object.termType === 'Literal' ? this._encodeLiteral(object) : this._encodeIriOrBlank(object);
      } // ### `_blockedWrite` replaces `_write` after the writer has been closed


      _blockedWrite() {
        throw new Error('Cannot write because the writer has been closed.');
      } // ### `addQuad` adds the quad to the output stream


      addQuad(subject, predicate, object, graph, done) {
        // The quad was given as an object, so shift parameters
        if (object === undefined) this._writeQuad(subject.subject, subject.predicate, subject.object, subject.graph, predicate); // The optional `graph` parameter was not provided
        else if (typeof graph === 'function') this._writeQuad(subject, predicate, object, DEFAULTGRAPH$1, graph); // The `graph` parameter was provided
          else this._writeQuad(subject, predicate, object, graph || DEFAULTGRAPH$1, done);
      } // ### `addQuads` adds the quads to the output stream


      addQuads(quads) {
        for (var i = 0; i < quads.length; i++) this.addQuad(quads[i]);
      } // ### `addPrefix` adds the prefix to the output stream


      addPrefix(prefix, iri, done) {
        var prefixes = {};
        prefixes[prefix] = iri;
        this.addPrefixes(prefixes, done);
      } // ### `addPrefixes` adds the prefixes to the output stream


      addPrefixes(prefixes, done) {
        var prefixIRIs = this._prefixIRIs,
            hasPrefixes = false;

        for (var prefix in prefixes) {
          var iri = prefixes[prefix];
          if (typeof iri !== 'string') iri = iri.value;
          hasPrefixes = true; // Finish a possible pending quad

          if (this._subject !== null) {
            this._write(this._inDefaultGraph ? '.\n' : '\n}\n');

            this._subject = null, this._graph = '';
          } // Store and write the prefix


          prefixIRIs[iri] = prefix += ':';

          this._write('@prefix ' + prefix + ' <' + iri + '>.\n');
        } // Recreate the prefix matcher


        if (hasPrefixes) {
          var IRIlist = '',
              prefixList = '';

          for (var prefixIRI in prefixIRIs) {
            IRIlist += IRIlist ? '|' + prefixIRI : prefixIRI;
            prefixList += (prefixList ? '|' : '') + prefixIRIs[prefixIRI];
          }

          IRIlist = IRIlist.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, '\\$&');
          this._prefixRegex = new RegExp('^(?:' + prefixList + ')[^\/]*$|' + '^(' + IRIlist + ')([a-zA-Z][\\-_a-zA-Z0-9]*)$');
        } // End a prefix block with a newline


        this._write(hasPrefixes ? '\n' : '', done);
      } // ### `blank` creates a blank node with the given content


      blank(predicate, object) {
        var children = predicate,
            child,
            length; // Empty blank node

        if (predicate === undefined) children = []; // Blank node passed as blank(Term("predicate"), Term("object"))
        else if (predicate.termType) children = [{
            predicate: predicate,
            object: object
          }]; // Blank node passed as blank({ predicate: predicate, object: object })
          else if (!('length' in predicate)) children = [predicate];

        switch (length = children.length) {
          // Generate an empty blank node
          case 0:
            return new SerializedTerm('[]');
          // Generate a non-nested one-triple blank node

          case 1:
            child = children[0];
            if (!(child.object instanceof SerializedTerm)) return new SerializedTerm('[ ' + this._encodePredicate(child.predicate) + ' ' + this._encodeObject(child.object) + ' ]');
          // Generate a multi-triple or nested blank node

          default:
            var contents = '['; // Write all triples in order

            for (var i = 0; i < length; i++) {
              child = children[i]; // Write only the object is the predicate is the same as the previous

              if (child.predicate.equals(predicate)) contents += ', ' + this._encodeObject(child.object); // Otherwise, write the predicate and the object
              else {
                  contents += (i ? ';\n  ' : '\n  ') + this._encodePredicate(child.predicate) + ' ' + this._encodeObject(child.object);
                  predicate = child.predicate;
                }
            }

            return new SerializedTerm(contents + '\n]');
        }
      } // ### `list` creates a list node with the given content


      list(elements) {
        var length = elements && elements.length || 0,
            contents = new Array(length);

        for (var i = 0; i < length; i++) contents[i] = this._encodeObject(elements[i]);

        return new SerializedTerm('(' + contents.join(' ') + ')');
      } // ### `end` signals the end of the output stream


      end(done) {
        // Finish a possible pending quad
        if (this._subject !== null) {
          this._write(this._inDefaultGraph ? '.\n' : '\n}\n');

          this._subject = null;
        } // Disallow further writing


        this._write = this._blockedWrite; // Try to end the underlying stream, ensuring done is called exactly one time

        var singleDone = done && function (error, result) {
          singleDone = null, done(error, result);
        };

        if (this._endStream) {
          try {
            return this._outputStream.end(singleDone);
          } catch (error) {
            /* error closing stream */
          }
        }

        singleDone && singleDone();
      }

    } // Replaces a character by its escaped version

    function characterReplacer(character) {
      // Replace a single character by its escaped version
      var result = escapedCharacters[character];

      if (result === undefined) {
        // Replace a single character with its 4-bit unicode escape sequence
        if (character.length === 1) {
          result = character.charCodeAt(0).toString(16);
          result = '\\u0000'.substr(0, 6 - result.length) + result;
        } // Replace a surrogate pair with its 8-bit unicode escape sequence
        else {
            result = ((character.charCodeAt(0) - 0xD800) * 0x400 + character.charCodeAt(1) + 0x2400).toString(16);
            result = '\\U00000000'.substr(0, 10 - result.length) + result;
          }
      }

      return result;
    }

    var domain; // This constructor is used to store event handlers. Instantiating this is
    // faster than explicitly calling `Object.create(null)` to get a "clean" empty
    // object (tested with v8 v4.9).

    function EventHandlers() {}

    EventHandlers.prototype = Object.create(null);

    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    // require('events') === require('events').EventEmitter

    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = false;
    EventEmitter.prototype.domain = undefined;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.

    EventEmitter.defaultMaxListeners = 10;

    EventEmitter.init = function () {
      this.domain = null;

      if (EventEmitter.usingDomains) {
        // if there is an active domain, then attach to it.
        if (domain.active && !(this instanceof domain.Domain)) ;
      }

      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    }; // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.


    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };

    function $getMaxListeners(that) {
      if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    }; // These standalone emit* functions are used to optimize calling of event
    // handlers for fast cases because emit() itself often has a variable number of
    // arguments and can be deoptimized because of that. These functions always have
    // the same number of arguments and thus do not get deoptimized, so the code
    // inside them can execute faster.


    function emitNone(handler, isFn, self) {
      if (isFn) handler.call(self);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) listeners[i].call(self);
      }
    }

    function emitOne(handler, isFn, self, arg1) {
      if (isFn) handler.call(self, arg1);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
      }
    }

    function emitTwo(handler, isFn, self, arg1, arg2) {
      if (isFn) handler.call(self, arg1, arg2);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
      }
    }

    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
      if (isFn) handler.call(self, arg1, arg2, arg3);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
      }
    }

    function emitMany(handler, isFn, self, args) {
      if (isFn) handler.apply(self, args);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
      }
    }

    EventEmitter.prototype.emit = function emit(type) {
      var er, handler, len, args, i, events, domain;
      var doError = type === 'error';
      events = this._events;
      if (events) doError = doError && events.error == null;else if (!doError) return false;
      domain = this.domain; // If there is no 'error' event listener then throw.

      if (doError) {
        er = arguments[1];

        if (domain) {
          if (!er) er = new Error('Uncaught, unspecified "error" event');
          er.domainEmitter = this;
          er.domain = domain;
          er.domainThrown = false;
          domain.emit('error', er);
        } else if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }

        return false;
      }

      handler = events[type];
      if (!handler) return false;
      var isFn = typeof handler === 'function';
      len = arguments.length;

      switch (len) {
        // fast cases
        case 1:
          emitNone(handler, isFn, this);
          break;

        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;

        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;

        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        // slower

        default:
          args = new Array(len - 1);

          for (i = 1; i < len; i++) args[i - 1] = arguments[i];

          emitMany(handler, isFn, this, args);
      }
      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
      events = target._events;

      if (!events) {
        events = target._events = new EventHandlers();
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
          target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object

          events = target._events;
        }

        existing = events[type];
      }

      if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else {
          // If we've already got an array, just append.
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        } // Check for listener leak


        if (!existing.warned) {
          m = $getMaxListeners(target);

          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            emitWarning(w);
          }
        }
      }

      return target;
    }

    function emitWarning(e) {
      typeof console.warn === 'function' ? console.warn(e) : console.log(e);
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

    function _onceWrap(target, type, listener) {
      var fired = false;

      function g() {
        target.removeListener(type, g);

        if (!fired) {
          fired = true;
          listener.apply(target, arguments);
        }
      }

      g.listener = listener;
      return g;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    }; // emits a 'removeListener' event iff the listener was removed


    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events) return this;
      list = events[type];
      if (!list) return this;

      if (list === listener || list.listener && list.listener === listener) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else {
          delete events[type];
          if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0) return this;

        if (list.length === 1) {
          list[0] = undefined;

          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events;
      events = this._events;
      if (!events) return this; // not listening for removeListener, no need to emit

      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
        }

        return this;
      } // emit removeListener for all listeners on all events


      if (arguments.length === 0) {
        var keys = Object.keys(events);

        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }

        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

    EventEmitter.prototype.listeners = function listeners(type) {
      var evlistener;
      var ret;
      var events = this._events;
      if (!events) ret = [];else {
        evlistener = events[type];
        if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
      }
      return ret;
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;

    function listenerCount(type) {
      var events = this._events;

      if (events) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    }; // About 1.5x faster than the two-arg version of Array#splice().


    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];

      list.pop();
    }

    function arrayClone(arr, i) {
      var copy = new Array(i);

      while (i--) copy[i] = arr[i];

      return copy;
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);

      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }

      return ret;
    }

    // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

    function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
    }

    function defaultClearTimeout() {
      throw new Error('clearTimeout has not been defined');
    }

    var cachedSetTimeout = defaultSetTimout;
    var cachedClearTimeout = defaultClearTimeout;

    if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    }

    if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    }

    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
      } // if setTimeout wasn't available but was latter defined


      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }

    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
      } // if clearTimeout wasn't available but was latter defined


      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }

      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
          // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker);
        }
      }
    }

    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }

      draining = false;

      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }

      if (queue.length) {
        drainQueue();
      }
    }

    function drainQueue() {
      if (draining) {
        return;
      }

      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;

      while (len) {
        currentQueue = queue;
        queue = [];

        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }

        queueIndex = -1;
        len = queue.length;
      }

      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }

    function nextTick(fun) {
      var args = new Array(arguments.length - 1);

      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }

      queue.push(new Item(fun, args));

      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    } // v8 likes predictible objects

    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }

    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };

    var performance = global$1.performance || {};

    var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
      return new Date().getTime();
    }; // generate timestamp or delta

    var inherits;

    if (typeof Object.create === 'function') {
      inherits = function inherits(ctor, superCtor) {
        // implementation from standard node.js 'util' module
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function () {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }

    var inherits$1 = inherits;

    var formatRegExp = /%[sdj%]/g;
    function format(f) {
      if (!isString(f)) {
        var objects = [];

        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }

        return objects.join(' ');
      }

      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function (x) {
        if (x === '%%') return '%';
        if (i >= len) return x;

        switch (x) {
          case '%s':
            return String(args[i++]);

          case '%d':
            return Number(args[i++]);

          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }

          default:
            return x;
        }
      });

      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += ' ' + x;
        } else {
          str += ' ' + inspect(x);
        }
      }

      return str;
    }
    // Returns a modified function which warns once by default.
    // If --no-deprecation is set, then it is a no-op.

    function deprecate(fn, msg) {
      // Allow for deprecating things in the process of starting up.
      if (isUndefined(global$1.process)) {
        return function () {
          return deprecate(fn, msg).apply(this, arguments);
        };
      }

      var warned = false;

      function deprecated() {
        if (!warned) {
          {
            console.error(msg);
          }

          warned = true;
        }

        return fn.apply(this, arguments);
      }

      return deprecated;
    }
    var debugs = {};
    var debugEnviron;
    function debuglog(set) {
      if (isUndefined(debugEnviron)) debugEnviron =  '';
      set = set.toUpperCase();

      if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
          var pid = 0;

          debugs[set] = function () {
            var msg = format.apply(null, arguments);
            console.error('%s %d: %s', set, pid, msg);
          };
        } else {
          debugs[set] = function () {};
        }
      }

      return debugs[set];
    }
    /**
     * Echos the value of a value. Trys to print the value out
     * in the best way possible given the different types.
     *
     * @param {Object} obj The object to print out.
     * @param {Object} opts Optional options object that alters the output.
     */

    /* legacy: obj, showHidden, depth, colors*/

    function inspect(obj, opts) {
      // default options
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      }; // legacy...

      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];

      if (isBoolean(opts)) {
        // legacy...
        ctx.showHidden = opts;
      } else if (opts) {
        // got an "options" object
        _extend(ctx, opts);
      } // set default options


      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    } // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

    inspect.colors = {
      'bold': [1, 22],
      'italic': [3, 23],
      'underline': [4, 24],
      'inverse': [7, 27],
      'white': [37, 39],
      'grey': [90, 39],
      'black': [30, 39],
      'blue': [34, 39],
      'cyan': [36, 39],
      'green': [32, 39],
      'magenta': [35, 39],
      'red': [31, 39],
      'yellow': [33, 39]
    }; // Don't use 'blue' not visible on cmd.exe

    inspect.styles = {
      'special': 'cyan',
      'number': 'yellow',
      'boolean': 'yellow',
      'undefined': 'grey',
      'null': 'bold',
      'string': 'green',
      'date': 'magenta',
      // "name": intentionally not styling
      'regexp': 'red'
    };

    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];

      if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
      } else {
        return str;
      }
    }

    function stylizeNoColor(str, styleType) {
      return str;
    }

    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }

    function formatValue(ctx, value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);

        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }

        return ret;
      } // Primitive types cannot have properties


      var primitive = formatPrimitive(ctx, value);

      if (primitive) {
        return primitive;
      } // Look up the keys of the object.


      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      } // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      } // Some type of object without properties can be shortcutted.


      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }

        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }

        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }

        if (isError(value)) {
          return formatError(value);
        }
      }

      var base = '',
          array = false,
          braces = ['{', '}']; // Make Array say that they are Array

      if (isArray$1(value)) {
        array = true;
        braces = ['[', ']'];
      } // Make functions say that they are functions


      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      } // Make RegExps say that they are RegExps


      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      } // Make dates with properties first say the date


      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      } // Make error with message first say the error


      if (isError(value)) {
        base = ' ' + formatError(value);
      }

      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }

      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }

      ctx.seen.push(value);
      var output;

      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }

      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }

    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

      if (isString(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }

      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

      if (isNull(value)) return ctx.stylize('null', 'null');
    }

    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }

    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];

      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }

      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }

    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };

      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }

      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }

      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }

          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }

      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }

        name = JSON.stringify('' + key);

        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    }

    function reduceToSingleString(output, base, braces) {
      var length = output.reduce(function (prev, cur) {
        if (cur.indexOf('\n') >= 0) ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);

      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }

      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    } // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.


    function isArray$1(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    function isString(arg) {
      return typeof arg === 'string';
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    function isFunction(arg) {
      return typeof arg === 'function';
    }

    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function _extend(origin, add) {
      // Don't do anything if add isn't an object
      if (!add || !isObject(add)) return origin;
      var keys = Object.keys(add);
      var i = keys.length;

      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }

      return origin;
    }

    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function BufferList() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    BufferList.prototype.push = function (v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    };

    BufferList.prototype.unshift = function (v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    };

    BufferList.prototype.shift = function () {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    };

    BufferList.prototype.clear = function () {
      this.head = this.tail = null;
      this.length = 0;
    };

    BufferList.prototype.join = function (s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    };

    BufferList.prototype.concat = function (n) {
      if (this.length === 0) return Buffer.alloc(0);
      if (this.length === 1) return this.head.data;
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        p.data.copy(ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    };

    // Copyright Joyent, Inc. and other Node contributors.

    var isBufferEncoding = Buffer.isEncoding || function (encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
          return true;

        default:
          return false;
      }
    };

    function assertEncoding(encoding) {
      if (encoding && !isBufferEncoding(encoding)) {
        throw new Error('Unknown encoding: ' + encoding);
      }
    } // StringDecoder provides an interface for efficiently splitting a series of
    // buffers into a series of JS strings without breaking apart multi-byte
    // characters. CESU-8 is handled as part of the UTF-8 encoding.
    //
    // @TODO Handling all encodings inside a single object makes it very difficult
    // to reason about this code, so it should be split up in the future.
    // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
    // points as used by CESU-8.


    function StringDecoder(encoding) {
      this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
      assertEncoding(encoding);

      switch (this.encoding) {
        case 'utf8':
          // CESU-8 represents each of Surrogate Pair by 3-bytes
          this.surrogateSize = 3;
          break;

        case 'ucs2':
        case 'utf16le':
          // UTF-16 represents each of Surrogate Pair by 2-bytes
          this.surrogateSize = 2;
          this.detectIncompleteChar = utf16DetectIncompleteChar;
          break;

        case 'base64':
          // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
          this.surrogateSize = 3;
          this.detectIncompleteChar = base64DetectIncompleteChar;
          break;

        default:
          this.write = passThroughWrite;
          return;
      } // Enough space to store all bytes of a single character. UTF-8 needs 4
      // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).


      this.charBuffer = new Buffer(6); // Number of bytes received for the current incomplete multi-byte character.

      this.charReceived = 0; // Number of bytes expected for the current incomplete multi-byte character.

      this.charLength = 0;
    }
    // guaranteed to not contain any partial multi-byte characters. Any partial
    // character found at the end of the buffer is buffered up, and will be
    // returned when calling write again with the remaining bytes.
    //
    // Note: Converting a Buffer containing an orphan surrogate to a String
    // currently works, but converting a String to a Buffer (via `new Buffer`, or
    // Buffer#write) will replace incomplete surrogates with the unicode
    // replacement character. See https://codereview.chromium.org/121173009/ .

    StringDecoder.prototype.write = function (buffer) {
      var charStr = ''; // if our last write ended with an incomplete multibyte character

      while (this.charLength) {
        // determine how many remaining bytes this buffer has to offer for this char
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length; // add the new bytes to the char buffer

        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;

        if (this.charReceived < this.charLength) {
          // still not enough chars in this buffer? wait for more ...
          return '';
        } // remove bytes belonging to the current character from the buffer


        buffer = buffer.slice(available, buffer.length); // get the character that was split

        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding); // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character

        var charCode = charStr.charCodeAt(charStr.length - 1);

        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
          this.charLength += this.surrogateSize;
          charStr = '';
          continue;
        }

        this.charReceived = this.charLength = 0; // if there are no more bytes in this buffer, just emit our char

        if (buffer.length === 0) {
          return charStr;
        }

        break;
      } // determine and set charLength / charReceived


      this.detectIncompleteChar(buffer);
      var end = buffer.length;

      if (this.charLength) {
        // buffer the incomplete character bytes we got
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }

      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end); // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character

      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      } // or just emit the charStr


      return charStr;
    }; // detectIncompleteChar determines if there is an incomplete UTF-8 character at
    // the end of the given buffer. If so, it sets this.charLength to the byte
    // length that character, and sets this.charReceived to the number of bytes
    // that are available for this character.


    StringDecoder.prototype.detectIncompleteChar = function (buffer) {
      // determine how many bytes we have to check at the end of this buffer
      var i = buffer.length >= 3 ? 3 : buffer.length; // Figure out if one of the last i bytes of our buffer announces an
      // incomplete char.

      for (; i > 0; i--) {
        var c = buffer[buffer.length - i]; // See http://en.wikipedia.org/wiki/UTF-8#Description
        // 110XXXXX

        if (i == 1 && c >> 5 == 0x06) {
          this.charLength = 2;
          break;
        } // 1110XXXX


        if (i <= 2 && c >> 4 == 0x0E) {
          this.charLength = 3;
          break;
        } // 11110XXX


        if (i <= 3 && c >> 3 == 0x1E) {
          this.charLength = 4;
          break;
        }
      }

      this.charReceived = i;
    };

    StringDecoder.prototype.end = function (buffer) {
      var res = '';
      if (buffer && buffer.length) res = this.write(buffer);

      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }

      return res;
    };

    function passThroughWrite(buffer) {
      return buffer.toString(this.encoding);
    }

    function utf16DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 2;
      this.charLength = this.charReceived ? 2 : 0;
    }

    function base64DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 3;
      this.charLength = this.charReceived ? 3 : 0;
    }

    Readable.ReadableState = ReadableState;
    var debug = debuglog('stream');
    inherits$1(Readable, EventEmitter);

    function prependListener(emitter, event, fn) {
      // Sadly this is not cacheable as some libraries bundle their own
      // event emitter implementation with them.
      if (typeof emitter.prependListener === 'function') {
        return emitter.prependListener(event, fn);
      } else {
        // This is a hack to make sure that our error handler is attached before any
        // userland ones.  NEVER DO THIS. This is here only because this code needs
        // to continue to work with older versions of Node.js that do not include
        // the prependListener() method. The goal is to eventually remove this hack.
        if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
      }
    }

    function listenerCount$1(emitter, type) {
      return emitter.listeners(type).length;
    }

    function ReadableState(options, stream) {
      options = options || {}; // object stream flag. Used to make read(n) ignore n and to
      // make all the buffer merging and length checks go away

      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
      // Note: 0 is a valid value, means "don't call _read preemptively ever"

      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm; // cast to ints.

      this.highWaterMark = ~~this.highWaterMark; // A linked list is used to store data chunks instead of an array because the
      // linked list can remove elements from the beginning faster than
      // array.shift()

      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false; // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.

      this.sync = true; // whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.

      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false; // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.

      this.defaultEncoding = options.defaultEncoding || 'utf8'; // when piping, we only care about 'readable' events that happen
      // after read()ing all the bytes and not getting any pushback.

      this.ranOut = false; // the number of writers that are awaiting a drain event in .pipe()s

      this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;

      if (options.encoding) {
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      if (!(this instanceof Readable)) return new Readable(options);
      this._readableState = new ReadableState(options, this); // legacy

      this.readable = true;
      if (options && typeof options.read === 'function') this._read = options.read;
      EventEmitter.call(this);
    } // Manually shove something into the read() buffer.
    // This returns true if the highWaterMark has not been hit yet,
    // similar to how Writable.write() returns true if you should
    // write() some more.

    Readable.prototype.push = function (chunk, encoding) {
      var state = this._readableState;

      if (!state.objectMode && typeof chunk === 'string') {
        encoding = encoding || state.defaultEncoding;

        if (encoding !== state.encoding) {
          chunk = Buffer.from(chunk, encoding);
          encoding = '';
        }
      }

      return readableAddChunk(this, state, chunk, encoding, false);
    }; // Unshift should *always* be something directly out of read()


    Readable.prototype.unshift = function (chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, '', true);
    };

    Readable.prototype.isPaused = function () {
      return this._readableState.flowing === false;
    };

    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);

      if (er) {
        stream.emit('error', er);
      } else if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error('stream.push() after EOF');
          stream.emit('error', e);
        } else if (state.endEmitted && addToFront) {
          var _e = new Error('stream.unshift() after end event');

          stream.emit('error', _e);
        } else {
          var skipAdd;

          if (state.decoder && !addToFront && !encoding) {
            chunk = state.decoder.write(chunk);
            skipAdd = !state.objectMode && chunk.length === 0;
          }

          if (!addToFront) state.reading = false; // Don't add to the buffer if we've decoded to an empty string chunk and
          // we're not in object mode

          if (!skipAdd) {
            // if we want the data now, just emit it.
            if (state.flowing && state.length === 0 && !state.sync) {
              stream.emit('data', chunk);
              stream.read(0);
            } else {
              // update the buffer info.
              state.length += state.objectMode ? 1 : chunk.length;
              if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
              if (state.needReadable) emitReadable(stream);
            }
          }

          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }

      return needMoreData(state);
    } // if it's past the high water mark, we can push in some more.
    // Also, if we have no data yet, we can stand some
    // more bytes.  This is to work around cases where hwm=0,
    // such as the repl.  Also, if the push() triggered a
    // readable event, and the user called read(largeNumber) such that
    // needReadable was set, then we ought to push more, so that another
    // 'readable' event will be triggered.


    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    } // backwards compatibility.


    Readable.prototype.setEncoding = function (enc) {
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    }; // Don't raise the hwm > 8MB


    var MAX_HWM = 0x800000;

    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }

      return n;
    } // This function is designed to be inlinable, so please take care when making
    // changes to the function body.


    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;

      if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
      } // If we're asking for more than the current hwm, then raise the hwm.


      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n; // Don't have enough

      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }

      return state.length;
    } // you can override either this method, or the async _read(n) below.


    Readable.prototype.read = function (n) {
      debug('read', n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
      // already have a bunch of data in the buffer, then just trigger
      // the 'readable' event and move on.

      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
        return null;
      }

      n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      } // All the actual chunk generation logic needs to be
      // *below* the call to _read.  The reason is that in certain
      // synthetic stream cases, such as passthrough streams, _read
      // may be a completely synchronous operation which may change
      // the state of the read buffer, providing enough data when
      // before there was *not* enough.
      //
      // So, the steps are:
      // 1. Figure out what the state of things will be after we do
      // a read from the buffer.
      //
      // 2. If that resulting state will trigger a _read, then call _read.
      // Note that this may be asynchronous, or synchronous.  Yes, it is
      // deeply ugly to write APIs this way, but that still doesn't mean
      // that the Readable class should behave improperly, as streams are
      // designed to be sync/async agnostic.
      // Take note if the _read call is sync or async (ie, if the read call
      // has returned yet), so that we know whether or not it's safe to emit
      // 'readable' etc.
      //
      // 3. Actually pull the requested chunks out of the buffer and return.
      // if we need a readable event, then we need to do some reading.


      var doRead = state.needReadable;
      debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      } // however, if we've ended, then there's no point, and if we're already
      // reading, then it's unnecessary.


      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      } else if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.

        if (state.length === 0) state.needReadable = true; // call internal read method

        this._read(state.highWaterMark);

        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.

        if (!state.reading) n = howMuchToRead(nOrig, state);
      }

      var ret;
      if (n > 0) ret = fromList(n, state);else ret = null;

      if (ret === null) {
        state.needReadable = true;
        n = 0;
      } else {
        state.length -= n;
      }

      if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

        if (nOrig !== n && state.ended) endReadable(this);
      }

      if (ret !== null) this.emit('data', ret);
      return ret;
    };

    function chunkInvalid(state, chunk) {
      var er = null;

      if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }

      return er;
    }

    function onEofChunk(stream, state) {
      if (state.ended) return;

      if (state.decoder) {
        var chunk = state.decoder.end();

        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }

      state.ended = true; // emit 'readable' now to make sure it gets picked up.

      emitReadable(stream);
    } // Don't emit readable right away in sync mode, because this can trigger
    // another read() call => stack overflow.  This way, it might trigger
    // a nextTick recursion warning, but that's not so bad.


    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;

      if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
      }
    }

    function emitReadable_(stream) {
      debug('emit readable');
      stream.emit('readable');
      flow(stream);
    } // at this point, the user has presumably seen the 'readable' event,
    // and called read() to consume some data.  that may have triggered
    // in turn another _read(n) call, in which case reading = true if
    // it's in progress.
    // However, if we're not ended, or reading, and the length < hwm,
    // then go ahead and try to read some more preemptively.


    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        nextTick(maybeReadMore_, stream, state);
      }
    }

    function maybeReadMore_(stream, state) {
      var len = state.length;

      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) // didn't get any data, stop spinning.
          break;else len = state.length;
      }

      state.readingMore = false;
    } // abstract method.  to be overridden in specific implementation classes.
    // call cb(er, data) where data is <= n in length.
    // for virtual (non-string, non-buffer) streams, "length" is somewhat
    // arbitrary, and perhaps not very meaningful.


    Readable.prototype._read = function (n) {
      this.emit('error', new Error('not implemented'));
    };

    Readable.prototype.pipe = function (dest, pipeOpts) {
      var src = this;
      var state = this._readableState;

      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;

        case 1:
          state.pipes = [state.pipes, dest];
          break;

        default:
          state.pipes.push(dest);
          break;
      }

      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== false;
      var endFn = doEnd ? onend : cleanup;
      if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);
      dest.on('unpipe', onunpipe);

      function onunpipe(readable) {
        debug('onunpipe');

        if (readable === src) {
          cleanup();
        }
      }

      function onend() {
        debug('onend');
        dest.end();
      } // when the dest drains, it reduces the awaitDrain counter
      // on the source.  This would be more elegant with a .once()
      // handler in flow(), but adding and removing repeatedly is
      // too slow.


      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
      var cleanedUp = false;

      function cleanup() {
        debug('cleanup'); // cleanup event handlers once the pipe is broken

        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', cleanup);
        src.removeListener('data', ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.

        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      } // If the user pushes more data while we're writing to dest then we'll end up
      // in ondata again. However, we only want to increase awaitDrain once because
      // dest will only emit one 'drain' event for the multiple writes.
      // => Introduce a guard on increasing awaitDrain.


      var increasedAwaitDrain = false;
      src.on('data', ondata);

      function ondata(chunk) {
        debug('ondata');
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);

        if (false === ret && !increasedAwaitDrain) {
          // If the user unpiped during `dest.write()`, it is possible
          // to get stuck in a permanently paused state if that write
          // also returned false.
          // => Check whether `dest` is still a piping destination.
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug('false write response, pause', src._readableState.awaitDrain);
            src._readableState.awaitDrain++;
            increasedAwaitDrain = true;
          }

          src.pause();
        }
      } // if the dest has an error, then stop piping into it.
      // however, don't suppress the throwing behavior for this.


      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
      } // Make sure our error handler is attached before userland ones.


      prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }

      dest.once('close', onclose);

      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }

      dest.once('finish', onfinish);

      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      } // tell the dest that it's being piped to


      dest.emit('pipe', src); // start the flow if it hasn't been started already.

      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }

      return dest;
    };

    function pipeOnDrain(src) {
      return function () {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;

        if (state.awaitDrain === 0 && src.listeners('data').length) {
          state.flowing = true;
          flow(src);
        }
      };
    }

    Readable.prototype.unpipe = function (dest) {
      var state = this._readableState; // if we're not piping anywhere, then do nothing.

      if (state.pipesCount === 0) return this; // just one destination.  most common case.

      if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes; // got a match.

        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this);
        return this;
      } // slow case. multiple pipe destinations.


      if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;

        for (var _i = 0; _i < len; _i++) {
          dests[_i].emit('unpipe', this);
        }

        return this;
      } // try to find the right one.


      var i = indexOf(state.pipes, dest);
      if (i === -1) return this;
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit('unpipe', this);
      return this;
    }; // set up data events if they are asked for
    // Ensure readable listeners eventually get something


    Readable.prototype.on = function (ev, fn) {
      var res = EventEmitter.prototype.on.call(this, ev, fn);

      if (ev === 'data') {
        // Start flowing on next tick if stream isn't explicitly paused
        if (this._readableState.flowing !== false) this.resume();
      } else if (ev === 'readable') {
        var state = this._readableState;

        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;

          if (!state.reading) {
            nextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this);
          }
        }
      }

      return res;
    };

    Readable.prototype.addListener = Readable.prototype.on;

    function nReadingNextTick(self) {
      debug('readable nexttick read 0');
      self.read(0);
    } // pause() and resume() are remnants of the legacy readable stream API
    // If the user uses them, then switch into old mode.


    Readable.prototype.resume = function () {
      var state = this._readableState;

      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
      }

      return this;
    };

    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        nextTick(resume_, stream, state);
      }
    }

    function resume_(stream, state) {
      if (!state.reading) {
        debug('resume read 0');
        stream.read(0);
      }

      state.resumeScheduled = false;
      state.awaitDrain = 0;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }

    Readable.prototype.pause = function () {
      debug('call pause flowing=%j', this._readableState.flowing);

      if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }

      return this;
    };

    function flow(stream) {
      var state = stream._readableState;
      debug('flow', state.flowing);

      while (state.flowing && stream.read() !== null) {}
    } // wrap an old-style stream as the async data source.
    // This is *not* part of the readable stream interface.
    // It is an ugly unfortunate mess of history.


    Readable.prototype.wrap = function (stream) {
      var state = this._readableState;
      var paused = false;
      var self = this;
      stream.on('end', function () {
        debug('wrapped end');

        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) self.push(chunk);
        }

        self.push(null);
      });
      stream.on('data', function (chunk) {
        debug('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

        if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = self.push(chunk);

        if (!ret) {
          paused = true;
          stream.pause();
        }
      }); // proxy all the other methods.
      // important when wrapping filters and duplexes.

      for (var i in stream) {
        if (this[i] === undefined && typeof stream[i] === 'function') {
          this[i] = function (method) {
            return function () {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      } // proxy certain important events.


      var events = ['error', 'close', 'destroy', 'pause', 'resume'];
      forEach(events, function (ev) {
        stream.on(ev, self.emit.bind(self, ev));
      }); // when we try to consume some more bytes, simply unpause the
      // underlying stream.

      self._read = function (n) {
        debug('wrapped _read', n);

        if (paused) {
          paused = false;
          stream.resume();
        }
      };

      return self;
    }; // exposed for testing purposes only.


    Readable._fromList = fromList; // Pluck off n bytes from an array of buffers.
    // Length is the combined lengths of all the buffers in the list.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.

    function fromList(n, state) {
      // nothing buffered
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        // read part of list
        ret = fromListPartial(n, state.buffer, state.decoder);
      }
      return ret;
    } // Extracts only enough buffered data to satisfy the amount requested.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.


    function fromListPartial(n, list, hasStrings) {
      var ret;

      if (n < list.head.data.length) {
        // slice is the same for buffers and strings
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
      } else if (n === list.head.data.length) {
        // first chunk is a perfect match
        ret = list.shift();
      } else {
        // result spans more than one buffer
        ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
      }

      return ret;
    } // Copies a specified amount of characters from the list of buffered data
    // chunks.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.


    function copyFromBufferString(n, list) {
      var p = list.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) list.head = p.next;else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      list.length -= c;
      return ret;
    } // Copies a specified amount of bytes from the list of buffered data chunks.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.


    function copyFromBuffer(n, list) {
      var ret = Buffer.allocUnsafe(n);
      var p = list.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) list.head = p.next;else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      list.length -= c;
      return ret;
    }

    function endReadable(stream) {
      var state = stream._readableState; // If we get here before consuming all the bytes, then that is a
      // bug in node.  Should never happen.

      if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

      if (!state.endEmitted) {
        state.ended = true;
        nextTick(endReadableNT, state, stream);
      }
    }

    function endReadableNT(state, stream) {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    }

    function forEach(xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }

    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }

      return -1;
    }

    // A bit simpler than readable streams.
    Writable.WritableState = WritableState;
    inherits$1(Writable, EventEmitter);

    function nop() {}

    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
      this.next = null;
    }

    function WritableState(options, stream) {
      Object.defineProperty(this, 'buffer', {
        get: deprecate(function () {
          return this.getBuffer();
        }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
      });
      options = options || {}; // object stream flag to indicate whether or not this stream
      // contains buffers or objects.

      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
      // Note: 0 is a valid value, means that we always return false if
      // the entire buffer is not flushed immediately on write()

      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm; // cast to ints.

      this.highWaterMark = ~~this.highWaterMark;
      this.needDrain = false; // at the start of calling end()

      this.ending = false; // when end() has been called, and returned

      this.ended = false; // when 'finish' is emitted

      this.finished = false; // should we decode strings into buffers before passing to _write?
      // this is here so that some node-core streams can optimize string
      // handling at a lower level.

      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.

      this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
      // of how much we're waiting to get pushed to some underlying
      // socket or file.

      this.length = 0; // a flag to see when we're in the middle of a write.

      this.writing = false; // when true all writes will be buffered until .uncork() call

      this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.

      this.sync = true; // a flag to know if we're processing previously buffered items, which
      // may call the _write() callback in the same tick, so that we don't
      // end up in an overlapped onwrite situation.

      this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

      this.onwrite = function (er) {
        onwrite(stream, er);
      }; // the callback that the user supplies to write(chunk,encoding,cb)


      this.writecb = null; // the amount that is being written when _write is called.

      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
      // this must be 0 before 'finish' can be emitted

      this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
      // This is relevant for synchronous Transform streams

      this.prefinished = false; // True if the error was already emitted and should not be thrown again

      this.errorEmitted = false; // count buffered requests

      this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
      // one allocated and free to use, and we maintain at most two

      this.corkedRequestsFree = new CorkedRequest(this);
    }

    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];

      while (current) {
        out.push(current);
        current = current.next;
      }

      return out;
    };
    function Writable(options) {
      // Writable ctor is applied to Duplexes, though they're not
      // instanceof Writable, they're instanceof Readable.
      if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);
      this._writableState = new WritableState(options, this); // legacy.

      this.writable = true;

      if (options) {
        if (typeof options.write === 'function') this._write = options.write;
        if (typeof options.writev === 'function') this._writev = options.writev;
      }

      EventEmitter.call(this);
    } // Otherwise people can pipe Writable streams, which is just wrong.

    Writable.prototype.pipe = function () {
      this.emit('error', new Error('Cannot pipe, not readable'));
    };

    function writeAfterEnd(stream, cb) {
      var er = new Error('write after end'); // TODO: defer error events consistently everywhere, not just the cb

      stream.emit('error', er);
      nextTick(cb, er);
    } // If we get something that is not a buffer, string, null, or undefined,
    // and we're not in objectMode, then that's an error.
    // Otherwise stream chunks are all considered to be of length=1, and the
    // watermarks determine how many objects to keep in the buffer, rather than
    // how many bytes or characters.


    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      var er = false; // Always throw error if a null is written
      // if we are not in object mode then throw
      // if it is not a buffer, string, or undefined.

      if (chunk === null) {
        er = new TypeError('May not write null values to stream');
      } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }

      if (er) {
        stream.emit('error', er);
        nextTick(cb, er);
        valid = false;
      }

      return valid;
    }

    Writable.prototype.write = function (chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;

      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }

      if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== 'function') cb = nop;
      if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };

    Writable.prototype.cork = function () {
      var state = this._writableState;
      state.corked++;
    };

    Writable.prototype.uncork = function () {
      var state = this._writableState;

      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };

    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      // node::ParseEncoding() requires lower case.
      if (typeof encoding === 'string') encoding = encoding.toLowerCase();
      if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };

    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
        chunk = Buffer.from(chunk, encoding);
      }

      return chunk;
    } // if we're already writing something, then just put this
    // in the queue, and wait our turn.  Otherwise, call _write
    // If we return false, then we need a drain event, so set that flag.


    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
      if (Buffer.isBuffer(chunk)) encoding = 'buffer';
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

      if (!ret) state.needDrain = true;

      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);

        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }

        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }

      return ret;
    }

    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }

    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) nextTick(cb, er);else cb(er);
      stream._writableState.errorEmitted = true;
      stream.emit('error', er);
    }

    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }

    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state);

        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }

        if (sync) {
          /*<replacement>*/
          nextTick(afterWrite, stream, state, finished, cb);
          /*</replacement>*/
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }

    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    } // Must force callback to be called on nextTick, so that we don't
    // emit 'drain' before the write() consumer gets the 'false' return
    // value, and has a chance to attach a 'drain' listener.


    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    } // if there's something in the buffer waiting, then process it


    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;

      if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;

        while (entry) {
          buffer[count] = entry;
          entry = entry.next;
          count += 1;
        }

        doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite

        state.pendingcb++;
        state.lastBufferedRequest = null;

        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
      } else {
        // Slow case, write chunks one-by-one
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next; // if we didn't call the onwrite immediately, then
          // it means that we need to wait until it does.
          // also, that means that the chunk and cb are currently
          // being processed, so move the buffer counter past them.

          if (state.writing) {
            break;
          }
        }

        if (entry === null) state.lastBufferedRequest = null;
      }

      state.bufferedRequestCount = 0;
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }

    Writable.prototype._write = function (chunk, encoding, cb) {
      cb(new Error('not implemented'));
    };

    Writable.prototype._writev = null;

    Writable.prototype.end = function (chunk, encoding, cb) {
      var state = this._writableState;

      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }

      if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

      if (state.corked) {
        state.corked = 1;
        this.uncork();
      } // ignore unnecessary end() calls.


      if (!state.ending && !state.finished) endWritable(this, state, cb);
    };

    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }

    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit('prefinish');
      }
    }

    function finishMaybe(stream, state) {
      var need = needFinish(state);

      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit('finish');
        } else {
          prefinish(stream, state);
        }
      }

      return need;
    }

    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);

      if (cb) {
        if (state.finished) nextTick(cb);else stream.once('finish', cb);
      }

      state.ended = true;
      stream.writable = false;
    } // It seems a linked list but it is not
    // there will be only 2 of these for each stream


    function CorkedRequest(state) {
      var _this = this;

      this.next = null;
      this.entry = null;

      this.finish = function (err) {
        var entry = _this.entry;
        _this.entry = null;

        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }

        if (state.corkedRequestsFree) {
          state.corkedRequestsFree.next = _this;
        } else {
          state.corkedRequestsFree = _this;
        }
      };
    }

    inherits$1(Duplex, Readable);
    var keys = Object.keys(Writable.prototype);

    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false) this.readable = false;
      if (options && options.writable === false) this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
      this.once('end', onend);
    } // the no-half-open enforcer

    function onend() {
      // if we allow half-open state, or if the writable side ended,
      // then we're ok.
      if (this.allowHalfOpen || this._writableState.ended) return; // no more data can be written.
      // But allow more writes to happen in this tick.

      nextTick(onEndNT, this);
    }

    function onEndNT(self) {
      self.end();
    }

    // a transform stream is a readable/writable stream where you do
    inherits$1(Transform, Duplex);

    function TransformState(stream) {
      this.afterTransform = function (er, data) {
        return afterTransform(stream, er, data);
      };

      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
      this.writeencoding = null;
    }

    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));
      ts.writechunk = null;
      ts.writecb = null;
      if (data !== null && data !== undefined) stream.push(data);
      cb(er);
      var rs = stream._readableState;
      rs.reading = false;

      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = new TransformState(this); // when the writable side finishes, then flush out anything remaining.

      var stream = this; // start out asking for a readable event once data is transformed.

      this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.

      this._readableState.sync = false;

      if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
      }

      this.once('prefinish', function () {
        if (typeof this._flush === 'function') this._flush(function (er) {
          done(stream, er);
        });else done(stream);
      });
    }

    Transform.prototype.push = function (chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    }; // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.


    Transform.prototype._transform = function (chunk, encoding, cb) {
      throw new Error('Not implemented');
    };

    Transform.prototype._write = function (chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;

      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    }; // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.


    Transform.prototype._read = function (n) {
      var ts = this._transformState;

      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;

        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };

    function done(stream, er) {
      if (er) return stream.emit('error', er); // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided

      var ws = stream._writableState;
      var ts = stream._transformState;
      if (ws.length) throw new Error('Calling transform done when ws.length != 0');
      if (ts.transforming) throw new Error('Calling transform done when still transforming');
      return stream.push(null);
    }

    inherits$1(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }

    PassThrough.prototype._transform = function (chunk, encoding, cb) {
      cb(null, chunk);
    };

    inherits$1(Stream, EventEmitter);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough; // Backwards-compat with node 0.4.x

    Stream.Stream = Stream;
    // part of this class) is overridden in the Readable class.

    function Stream() {
      EventEmitter.call(this);
    }

    Stream.prototype.pipe = function (dest, options) {
      var source = this;

      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }

      source.on('data', ondata);

      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }

      dest.on('drain', ondrain); // If the 'end' option is not supplied, dest.end() will be called when
      // source gets the 'end' or 'close' events.  Only dest.end() once.

      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
      }

      var didOnEnd = false;

      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }

      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === 'function') dest.destroy();
      } // don't leave dangling pipes when there are errors.


      function onerror(er) {
        cleanup();

        if (EventEmitter.listenerCount(this, 'error') === 0) {
          throw er; // Unhandled stream error in pipe.
        }
      }

      source.on('error', onerror);
      dest.on('error', onerror); // remove all the event listeners that were added.

      function cleanup() {
        source.removeListener('data', ondata);
        dest.removeListener('drain', ondrain);
        source.removeListener('end', onend);
        source.removeListener('close', onclose);
        source.removeListener('error', onerror);
        dest.removeListener('error', onerror);
        source.removeListener('end', cleanup);
        source.removeListener('close', cleanup);
        dest.removeListener('close', cleanup);
      }

      source.on('end', cleanup);
      source.on('close', cleanup);
      dest.on('close', cleanup);
      dest.emit('pipe', source); // Allow for unix-like usage: A.pipe(B).pipe(C)

      return dest;
    };

    // **N3Store** objects store N3 quads by graph in memory.
    const {
      toId: toId$1,
      fromId: fromId$1
    } = DataFactory$1.internal; // ## Constructor

    class N3Store {
      constructor(quads, options) {
        // The number of quads is initially zero
        this._size = 0; // `_graphs` contains subject, predicate, and object indexes per graph

        this._graphs = Object.create(null); // `_ids` maps entities such as `http://xmlns.com/foaf/0.1/name` to numbers,
        // saving memory by using only numbers as keys in `_graphs`

        this._id = 0;
        this._ids = Object.create(null);
        this._ids['><'] = 0; // dummy entry, so the first actual key is non-zero

        this._entities = Object.create(null); // inverse of `_ids`
        // `_blankNodeIndex` is the index of the last automatically named blank node

        this._blankNodeIndex = 0; // Shift parameters if `quads` is not given

        if (!options && quads && !quads[0]) options = quads, quads = null;
        options = options || {};
        this._factory = options.factory || DataFactory$1; // Add quads if passed

        if (quads) this.addQuads(quads);
      } // ## Public properties
      // ### `size` returns the number of quads in the store


      get size() {
        // Return the quad count if if was cached
        var size = this._size;
        if (size !== null) return size; // Calculate the number of quads by counting to the deepest level

        size = 0;
        var graphs = this._graphs,
            subjects,
            subject;

        for (var graphKey in graphs) for (var subjectKey in subjects = graphs[graphKey].subjects) for (var predicateKey in subject = subjects[subjectKey]) size += Object.keys(subject[predicateKey]).length;

        return this._size = size;
      } // ## Private methods
      // ### `_addToIndex` adds a quad to a three-layered index.
      // Returns if the index has changed, if the entry did not already exist.


      _addToIndex(index0, key0, key1, key2) {
        // Create layers as necessary
        var index1 = index0[key0] || (index0[key0] = {});
        var index2 = index1[key1] || (index1[key1] = {}); // Setting the key to _any_ value signals the presence of the quad

        var existed = key2 in index2;
        if (!existed) index2[key2] = null;
        return !existed;
      } // ### `_removeFromIndex` removes a quad from a three-layered index


      _removeFromIndex(index0, key0, key1, key2) {
        // Remove the quad from the index
        var index1 = index0[key0],
            index2 = index1[key1],
            key;
        delete index2[key2]; // Remove intermediary index layers if they are empty

        for (key in index2) return;

        delete index1[key1];

        for (key in index1) return;

        delete index0[key0];
      } // ### `_findInIndex` finds a set of quads in a three-layered index.
      // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
      // Any of these keys can be undefined, which is interpreted as a wildcard.
      // `name0`, `name1`, and `name2` are the names of the keys at each level,
      // used when reconstructing the resulting quad
      // (for instance: _subject_, _predicate_, and _object_).
      // Finally, `graph` will be the graph of the created quads.
      // If `callback` is given, each result is passed through it
      // and iteration halts when it returns truthy for any quad.
      // If instead `array` is given, each result is added to the array.


      _findInIndex(index0, key0, key1, key2, name0, name1, name2, graph, callback, array) {
        var tmp,
            index1,
            index2,
            varCount = !key0 + !key1 + !key2,
            // depending on the number of variables, keys or reverse index are faster
        entityKeys = varCount > 1 ? Object.keys(this._ids) : this._entities; // If a key is specified, use only that part of index 0.

        if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];

        for (var value0 in index0) {
          var entity0 = entityKeys[value0];

          if (index1 = index0[value0]) {
            // If a key is specified, use only that part of index 1.
            if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];

            for (var value1 in index1) {
              var entity1 = entityKeys[value1];

              if (index2 = index1[value1]) {
                // If a key is specified, use only that part of index 2, if it exists.
                var values = key2 ? key2 in index2 ? [key2] : [] : Object.keys(index2); // Create quads for all items found in index 2.

                for (var l = 0; l < values.length; l++) {
                  var parts = {
                    subject: null,
                    predicate: null,
                    object: null
                  };
                  parts[name0] = fromId$1(entity0, this._factory);
                  parts[name1] = fromId$1(entity1, this._factory);
                  parts[name2] = fromId$1(entityKeys[values[l]], this._factory);

                  var quad = this._factory.quad(parts.subject, parts.predicate, parts.object, fromId$1(graph, this._factory));

                  if (array) array.push(quad);else if (callback(quad)) return true;
                }
              }
            }
          }
        }

        return array;
      } // ### `_loop` executes the callback on all keys of index 0


      _loop(index0, callback) {
        for (var key0 in index0) callback(key0);
      } // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0


      _loopByKey0(index0, key0, callback) {
        var index1, key1;

        if (index1 = index0[key0]) {
          for (key1 in index1) callback(key1);
        }
      } // ### `_loopByKey1` executes the callback on given keys of all entries in index 0


      _loopByKey1(index0, key1, callback) {
        var key0, index1;

        for (key0 in index0) {
          index1 = index0[key0];
          if (index1[key1]) callback(key0);
        }
      } // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2


      _loopBy2Keys(index0, key0, key1, callback) {
        var index1, index2, key2;

        if ((index1 = index0[key0]) && (index2 = index1[key1])) {
          for (key2 in index2) callback(key2);
        }
      } // ### `_countInIndex` counts matching quads in a three-layered index.
      // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
      // Any of these keys can be undefined, which is interpreted as a wildcard.


      _countInIndex(index0, key0, key1, key2) {
        var count = 0,
            tmp,
            index1,
            index2; // If a key is specified, count only that part of index 0

        if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];

        for (var value0 in index0) {
          if (index1 = index0[value0]) {
            // If a key is specified, count only that part of index 1
            if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];

            for (var value1 in index1) {
              if (index2 = index1[value1]) {
                // If a key is specified, count the quad if it exists
                if (key2) key2 in index2 && count++; // Otherwise, count all quads
                else count += Object.keys(index2).length;
              }
            }
          }
        }

        return count;
      } // ### `_getGraphs` returns an array with the given graph,
      // or all graphs if the argument is null or undefined.


      _getGraphs(graph) {
        if (!isString$1(graph)) return this._graphs;
        var graphs = {};
        graphs[graph] = this._graphs[graph];
        return graphs;
      } // ### `_uniqueEntities` returns a function that accepts an entity ID
      // and passes the corresponding entity to callback if it hasn't occurred before.


      _uniqueEntities(callback) {
        var uniqueIds = Object.create(null),
            entities = this._entities;
        return function (id) {
          if (!(id in uniqueIds)) {
            uniqueIds[id] = true;
            callback(fromId$1(entities[id]));
          }
        };
      } // ## Public methods
      // ### `addQuad` adds a new quad to the store.
      // Returns if the quad index has changed, if the quad did not already exist.


      addQuad(subject, predicate, object, graph) {
        // Shift arguments if a quad object is given instead of components
        if (!predicate) graph = subject.graph, object = subject.object, predicate = subject.predicate, subject = subject.subject; // Convert terms to internal string representation

        subject = toId$1(subject);
        predicate = toId$1(predicate);
        object = toId$1(object);
        graph = toId$1(graph); // Find the graph that will contain the triple

        var graphItem = this._graphs[graph]; // Create the graph if it doesn't exist yet

        if (!graphItem) {
          graphItem = this._graphs[graph] = {
            subjects: {},
            predicates: {},
            objects: {}
          }; // Freezing a graph helps subsequent `add` performance,
          // and properties will never be modified anyway

          Object.freeze(graphItem);
        } // Since entities can often be long IRIs, we avoid storing them in every index.
        // Instead, we have a separate index that maps entities to numbers,
        // which are then used as keys in the other indexes.


        var ids = this._ids;
        var entities = this._entities;
        subject = ids[subject] || (ids[entities[++this._id] = subject] = this._id);
        predicate = ids[predicate] || (ids[entities[++this._id] = predicate] = this._id);
        object = ids[object] || (ids[entities[++this._id] = object] = this._id);

        var changed = this._addToIndex(graphItem.subjects, subject, predicate, object);

        this._addToIndex(graphItem.predicates, predicate, object, subject);

        this._addToIndex(graphItem.objects, object, subject, predicate); // The cached quad count is now invalid


        this._size = null;
        return changed;
      } // ### `addQuads` adds multiple quads to the store


      addQuads(quads) {
        for (var i = 0; i < quads.length; i++) this.addQuad(quads[i]);
      } // ### `import` adds a stream of quads to the store


      import(stream) {
        var self = this;
        stream.on('data', function (quad) {
          self.addQuad(quad);
        });
        return stream;
      } // ### `removeQuad` removes a quad from the store if it exists


      removeQuad(subject, predicate, object, graph) {
        // Shift arguments if a quad object is given instead of components
        if (!predicate) graph = subject.graph, object = subject.object, predicate = subject.predicate, subject = subject.subject; // Convert terms to internal string representation

        subject = toId$1(subject);
        predicate = toId$1(predicate);
        object = toId$1(object);
        graph = toId$1(graph); // Find internal identifiers for all components
        // and verify the quad exists.

        var graphItem,
            ids = this._ids,
            graphs = this._graphs,
            subjects,
            predicates;
        if (!(subject = ids[subject]) || !(predicate = ids[predicate]) || !(object = ids[object]) || !(graphItem = graphs[graph]) || !(subjects = graphItem.subjects[subject]) || !(predicates = subjects[predicate]) || !(object in predicates)) return false; // Remove it from all indexes

        this._removeFromIndex(graphItem.subjects, subject, predicate, object);

        this._removeFromIndex(graphItem.predicates, predicate, object, subject);

        this._removeFromIndex(graphItem.objects, object, subject, predicate);

        if (this._size !== null) this._size--; // Remove the graph if it is empty

        for (subject in graphItem.subjects) return true;

        delete graphs[graph];
        return true;
      } // ### `removeQuads` removes multiple quads from the store


      removeQuads(quads) {
        for (var i = 0; i < quads.length; i++) this.removeQuad(quads[i]);
      } // ### `remove` removes a stream of quads from the store


      remove(stream) {
        var self = this;
        stream.on('data', function (quad) {
          self.removeQuad(quad);
        });
        return stream;
      } // ### `removeMatches` removes all matching quads from the store
      // Setting any field to `undefined` or `null` indicates a wildcard.


      removeMatches(subject, predicate, object, graph) {
        return this.remove(this.match(subject, predicate, object, graph));
      } // ### `deleteGraph` removes all triples with the given graph from the store


      deleteGraph(graph) {
        return this.removeMatches(null, null, null, graph);
      } // ### `getQuads` returns an array of quads matching a pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      getQuads(subject, predicate, object, graph) {
        // Convert terms to internal string representation
        subject = subject && toId$1(subject);
        predicate = predicate && toId$1(predicate);
        object = object && toId$1(object);
        graph = graph && toId$1(graph);

        var quads = [],
            graphs = this._getGraphs(graph),
            content,
            ids = this._ids,
            subjectId,
            predicateId,
            objectId; // Translate IRIs to internal index keys.


        if (isString$1(subject) && !(subjectId = ids[subject]) || isString$1(predicate) && !(predicateId = ids[predicate]) || isString$1(object) && !(objectId = ids[object])) return quads;

        for (var graphId in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graphId]) {
            // Choose the optimal index, based on what fields are present
            if (subjectId) {
              if (objectId) // If subject and object are given, the object index will be the fastest
                this._findInIndex(content.objects, objectId, subjectId, predicateId, 'object', 'subject', 'predicate', graphId, null, quads);else // If only subject and possibly predicate are given, the subject index will be the fastest
                this._findInIndex(content.subjects, subjectId, predicateId, null, 'subject', 'predicate', 'object', graphId, null, quads);
            } else if (predicateId) // If only predicate and possibly object are given, the predicate index will be the fastest
              this._findInIndex(content.predicates, predicateId, objectId, null, 'predicate', 'object', 'subject', graphId, null, quads);else if (objectId) // If only object is given, the object index will be the fastest
              this._findInIndex(content.objects, objectId, null, null, 'object', 'subject', 'predicate', graphId, null, quads);else // If nothing is given, iterate subjects and predicates first
              this._findInIndex(content.subjects, null, null, null, 'subject', 'predicate', 'object', graphId, null, quads);
          }
        }

        return quads;
      } // ### `match` returns a stream of quads matching a pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      match(subject, predicate, object, graph) {
        var stream = new Readable({
          objectMode: true
        }); // Initialize stream once it is being read

        stream._read = () => {
          for (var quad of this.getQuads(subject, predicate, object, graph)) stream.push(quad);

          stream.push(null);
        };

        return stream;
      } // ### `countQuads` returns the number of quads matching a pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      countQuads(subject, predicate, object, graph) {
        // Convert terms to internal string representation
        subject = subject && toId$1(subject);
        predicate = predicate && toId$1(predicate);
        object = object && toId$1(object);
        graph = graph && toId$1(graph);

        var count = 0,
            graphs = this._getGraphs(graph),
            content,
            ids = this._ids,
            subjectId,
            predicateId,
            objectId; // Translate IRIs to internal index keys.


        if (isString$1(subject) && !(subjectId = ids[subject]) || isString$1(predicate) && !(predicateId = ids[predicate]) || isString$1(object) && !(objectId = ids[object])) return 0;

        for (var graphId in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graphId]) {
            // Choose the optimal index, based on what fields are present
            if (subject) {
              if (object) // If subject and object are given, the object index will be the fastest
                count += this._countInIndex(content.objects, objectId, subjectId, predicateId);else // If only subject and possibly predicate are given, the subject index will be the fastest
                count += this._countInIndex(content.subjects, subjectId, predicateId, objectId);
            } else if (predicate) {
              // If only predicate and possibly object are given, the predicate index will be the fastest
              count += this._countInIndex(content.predicates, predicateId, objectId, subjectId);
            } else {
              // If only object is possibly given, the object index will be the fastest
              count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
            }
          }
        }

        return count;
      } // ### `forEach` executes the callback on all quads.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      forEach(callback, subject, predicate, object, graph) {
        this.some(function (quad) {
          callback(quad);
          return false;
        }, subject, predicate, object, graph);
      } // ### `every` executes the callback on all quads,
      // and returns `true` if it returns truthy for all them.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      every(callback, subject, predicate, object, graph) {
        var some = false;
        var every = !this.some(function (quad) {
          some = true;
          return !callback(quad);
        }, subject, predicate, object, graph);
        return some && every;
      } // ### `some` executes the callback on all quads,
      // and returns `true` if it returns truthy for any of them.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      some(callback, subject, predicate, object, graph) {
        // Convert terms to internal string representation
        subject = subject && toId$1(subject);
        predicate = predicate && toId$1(predicate);
        object = object && toId$1(object);
        graph = graph && toId$1(graph);

        var graphs = this._getGraphs(graph),
            content,
            ids = this._ids,
            subjectId,
            predicateId,
            objectId; // Translate IRIs to internal index keys.


        if (isString$1(subject) && !(subjectId = ids[subject]) || isString$1(predicate) && !(predicateId = ids[predicate]) || isString$1(object) && !(objectId = ids[object])) return false;

        for (var graphId in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graphId]) {
            // Choose the optimal index, based on what fields are present
            if (subjectId) {
              if (objectId) {
                // If subject and object are given, the object index will be the fastest
                if (this._findInIndex(content.objects, objectId, subjectId, predicateId, 'object', 'subject', 'predicate', graphId, callback, null)) return true;
              } else // If only subject and possibly predicate are given, the subject index will be the fastest
                if (this._findInIndex(content.subjects, subjectId, predicateId, null, 'subject', 'predicate', 'object', graphId, callback, null)) return true;
            } else if (predicateId) {
              // If only predicate and possibly object are given, the predicate index will be the fastest
              if (this._findInIndex(content.predicates, predicateId, objectId, null, 'predicate', 'object', 'subject', graphId, callback, null)) {
                return true;
              }
            } else if (objectId) {
              // If only object is given, the object index will be the fastest
              if (this._findInIndex(content.objects, objectId, null, null, 'object', 'subject', 'predicate', graphId, callback, null)) {
                return true;
              }
            } else // If nothing is given, iterate subjects and predicates first
              if (this._findInIndex(content.subjects, null, null, null, 'subject', 'predicate', 'object', graphId, callback, null)) {
                return true;
              }
          }
        }

        return false;
      } // ### `getSubjects` returns all subjects that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      getSubjects(predicate, object, graph) {
        var results = [];
        this.forSubjects(function (s) {
          results.push(s);
        }, predicate, object, graph);
        return results;
      } // ### `forSubjects` executes the callback on all subjects that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      forSubjects(callback, predicate, object, graph) {
        // Convert terms to internal string representation
        predicate = predicate && toId$1(predicate);
        object = object && toId$1(object);
        graph = graph && toId$1(graph);

        var ids = this._ids,
            graphs = this._getGraphs(graph),
            content,
            predicateId,
            objectId;

        callback = this._uniqueEntities(callback); // Translate IRIs to internal index keys.

        if (isString$1(predicate) && !(predicateId = ids[predicate]) || isString$1(object) && !(objectId = ids[object])) return;

        for (graph in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graph]) {
            // Choose optimal index based on which fields are wildcards
            if (predicateId) {
              if (objectId) // If predicate and object are given, the POS index is best.
                this._loopBy2Keys(content.predicates, predicateId, objectId, callback);else // If only predicate is given, the SPO index is best.
                this._loopByKey1(content.subjects, predicateId, callback);
            } else if (objectId) // If only object is given, the OSP index is best.
              this._loopByKey0(content.objects, objectId, callback);else // If no params given, iterate all the subjects
              this._loop(content.subjects, callback);
          }
        }
      } // ### `getPredicates` returns all predicates that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      getPredicates(subject, object, graph) {
        var results = [];
        this.forPredicates(function (p) {
          results.push(p);
        }, subject, object, graph);
        return results;
      } // ### `forPredicates` executes the callback on all predicates that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      forPredicates(callback, subject, object, graph) {
        // Convert terms to internal string representation
        subject = subject && toId$1(subject);
        object = object && toId$1(object);
        graph = graph && toId$1(graph);

        var ids = this._ids,
            graphs = this._getGraphs(graph),
            content,
            subjectId,
            objectId;

        callback = this._uniqueEntities(callback); // Translate IRIs to internal index keys.

        if (isString$1(subject) && !(subjectId = ids[subject]) || isString$1(object) && !(objectId = ids[object])) return;

        for (graph in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graph]) {
            // Choose optimal index based on which fields are wildcards
            if (subjectId) {
              if (objectId) // If subject and object are given, the OSP index is best.
                this._loopBy2Keys(content.objects, objectId, subjectId, callback);else // If only subject is given, the SPO index is best.
                this._loopByKey0(content.subjects, subjectId, callback);
            } else if (objectId) // If only object is given, the POS index is best.
              this._loopByKey1(content.predicates, objectId, callback);else // If no params given, iterate all the predicates.
              this._loop(content.predicates, callback);
          }
        }
      } // ### `getObjects` returns all objects that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      getObjects(subject, predicate, graph) {
        var results = [];
        this.forObjects(function (o) {
          results.push(o);
        }, subject, predicate, graph);
        return results;
      } // ### `forObjects` executes the callback on all objects that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      forObjects(callback, subject, predicate, graph) {
        // Convert terms to internal string representation
        subject = subject && toId$1(subject);
        predicate = predicate && toId$1(predicate);
        graph = graph && toId$1(graph);

        var ids = this._ids,
            graphs = this._getGraphs(graph),
            content,
            subjectId,
            predicateId;

        callback = this._uniqueEntities(callback); // Translate IRIs to internal index keys.

        if (isString$1(subject) && !(subjectId = ids[subject]) || isString$1(predicate) && !(predicateId = ids[predicate])) return;

        for (graph in graphs) {
          // Only if the specified graph contains triples, there can be results
          if (content = graphs[graph]) {
            // Choose optimal index based on which fields are wildcards
            if (subjectId) {
              if (predicateId) // If subject and predicate are given, the SPO index is best.
                this._loopBy2Keys(content.subjects, subjectId, predicateId, callback);else // If only subject is given, the OSP index is best.
                this._loopByKey1(content.objects, subjectId, callback);
            } else if (predicateId) // If only predicate is given, the POS index is best.
              this._loopByKey0(content.predicates, predicateId, callback);else // If no params given, iterate all the objects.
              this._loop(content.objects, callback);
          }
        }
      } // ### `getGraphs` returns all graphs that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      getGraphs(subject, predicate, object) {
        var results = [];
        this.forGraphs(function (g) {
          results.push(g);
        }, subject, predicate, object);
        return results;
      } // ### `forGraphs` executes the callback on all graphs that match the pattern.
      // Setting any field to `undefined` or `null` indicates a wildcard.


      forGraphs(callback, subject, predicate, object) {
        for (var graph in this._graphs) {
          this.some(function (quad) {
            callback(quad.graph);
            return true; // Halt iteration of some()
          }, subject, predicate, object, graph);
        }
      } // ### `createBlankNode` creates a new blank node, returning its name


      createBlankNode(suggestedName) {
        var name, index; // Generate a name based on the suggested name

        if (suggestedName) {
          name = suggestedName = '_:' + suggestedName, index = 1;

          while (this._ids[name]) name = suggestedName + index++;
        } // Generate a generic blank node name
        else {
            do {
              name = '_:b' + this._blankNodeIndex++;
            } while (this._ids[name]);
          } // Add the blank node to the entities, avoiding the generation of duplicates


        this._ids[name] = ++this._id;
        this._entities[this._id] = name;
        return this._factory.blankNode(name.substr(2));
      } // ### `extractLists` finds and removes all list triples
      // and returns the items per list.


      extractLists({
        remove = false,
        ignoreErrors = false
      } = {}) {
        var lists = {}; // has scalar keys so could be a simple Object

        var onError = ignoreErrors ? () => true : (node, message) => {
          throw new Error(`${node.value} ${message}`);
        }; // Traverse each list from its tail

        var tails = this.getQuads(null, namespaces.rdf.rest, namespaces.rdf.nil, null);
        var toRemove = remove ? [...tails] : [];
        tails.forEach(tailQuad => {
          var items = []; // the members found as objects of rdf:first quads

          var malformed = false; // signals whether the current list is malformed

          var head; // the head of the list (_:b1 in above example)

          var headPos; // set to subject or object when head is set

          var graph = tailQuad.graph; // make sure list is in exactly one graph
          // Traverse the list from tail to end

          var current = tailQuad.subject;

          while (current && !malformed) {
            var objectQuads = this.getQuads(null, null, current, null);
            var subjectQuads = this.getQuads(current, null, null, null);
            var i,
                quad,
                first = null,
                rest = null,
                parent = null; // Find the first and rest of this list node

            for (i = 0; i < subjectQuads.length && !malformed; i++) {
              quad = subjectQuads[i];
              if (!quad.graph.equals(graph)) malformed = onError(current, 'not confined to single graph');else if (head) malformed = onError(current, 'has non-list arcs out'); // one rdf:first
              else if (quad.predicate.value === namespaces.rdf.first) {
                  if (first) malformed = onError(current, 'has multiple rdf:first arcs');else toRemove.push(first = quad);
                } // one rdf:rest
                else if (quad.predicate.value === namespaces.rdf.rest) {
                    if (rest) malformed = onError(current, 'has multiple rdf:rest arcs');else toRemove.push(rest = quad);
                  } // alien triple
                  else if (objectQuads.length) malformed = onError(current, 'can\'t be subject and object');else {
                      head = quad; // e.g. { (1 2 3) :p :o }

                      headPos = 'subject';
                    }
            } // { :s :p (1 2) } arrives here with no head
            // { (1 2) :p :o } arrives here with head set to the list.


            for (i = 0; i < objectQuads.length && !malformed; ++i) {
              quad = objectQuads[i];
              if (head) malformed = onError(current, 'can\'t have coreferences'); // one rdf:rest
              else if (quad.predicate.value === namespaces.rdf.rest) {
                  if (parent) malformed = onError(current, 'has incoming rdf:rest arcs');else parent = quad;
                } else {
                  head = quad; // e.g. { :s :p (1 2) }

                  headPos = 'object';
                }
            } // Store the list item and continue with parent


            if (!first) malformed = onError(current, 'has no list head');else items.unshift(first.object);
            current = parent && parent.subject;
          } // Don't remove any quads if the list is malformed


          if (malformed) remove = false; // Store the list under the value of its head
          else if (head) lists[head[headPos].value] = items;
        }); // Remove list quads if requested

        if (remove) this.removeQuads(toRemove);
        return lists;
      }

    } // Determines whether the argument is a string

    function isString$1(s) {
      return typeof s === 'string' || s instanceof String;
    }

    var ShExRSchema = "PREFIX sx: <http://www.w3.org/ns/shex#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nBASE <http://www.w3.org/ns/shex#>\nstart=@<Schema>\n\n<Schema> CLOSED {\n  a [sx:Schema] ;\n  sx:imports @<IriList1Plus>? ;\n  sx:startActs @<SemActList1Plus>? ;\n  sx:start @<shapeExpr>?;\n  sx:shapes @<shapeExpr>*\n}\n\n<shapeExpr> @<ShapeOr> OR @<ShapeAnd> OR @<ShapeNot> OR @<NodeConstraint> OR @<Shape> OR @<ShapeExternal>\n\n<ShapeOr> CLOSED {\n  a [sx:ShapeOr] ;\n  sx:shapeExprs @<shapeExprList2Plus>\n}\n\n<ShapeAnd> CLOSED {\n  a [sx:ShapeAnd] ;\n  sx:shapeExprs @<shapeExprList2Plus>\n}\n\n<ShapeNot> CLOSED {\n  a [sx:ShapeNot] ;\n  sx:shapeExpr @<shapeExpr>\n}\n\n<NodeConstraint> CLOSED {\n  a [sx:NodeConstraint] ;\n  sx:nodeKind [sx:iri sx:bnode sx:literal sx:nonliteral]?;\n  sx:datatype IRI ? ;\n  &<xsFacets>  ;\n  sx:values @<valueSetValueList1Plus>?\n}\n\n<Shape> CLOSED {\n  a [sx:Shape] ;\n  sx:closed [true false]? ;\n  sx:extra IRI* ;\n  sx:expression @<tripleExpression>? ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>? ;\n}\n\n<ShapeExternal> CLOSED {\n  a [sx:ShapeExternal] ;\n}\n\n<SemAct> CLOSED {\n  a [sx:SemAct] ;\n  sx:name IRI ;\n  sx:code xsd:string?\n}\n\n<Annotation> CLOSED {\n  a [sx:Annotation] ;\n  sx:predicate IRI ;\n  sx:object @<objectValue>\n}\n\n# <xsFacet> @<stringFacet> OR @<numericFacet>\n<facet_holder> { # hold labeled productions\n  $<xsFacets> ( &<stringFacet> | &<numericFacet> )* ;\n  $<stringFacet> (\n      sx:length xsd:integer\n    | sx:minlength xsd:integer\n    | sx:maxlength xsd:integer\n    | sx:pattern xsd:string ; sx:flags xsd:string?\n  );\n  $<numericFacet> (\n      sx:mininclusive   @<numericLiteral>\n    | sx:minexclusive   @<numericLiteral>\n    | sx:maxinclusive   @<numericLiteral>\n    | sx:maxexclusive   @<numericLiteral>\n    | sx:totaldigits    xsd:integer\n    | sx:fractiondigits xsd:integer\n  )\n}\n<numericLiteral> xsd:integer OR xsd:decimal OR xsd:double\n\n<valueSetValue> @<objectValue> OR @<IriStem> OR @<IriStemRange>\n                               OR @<LiteralStem> OR @<LiteralStemRange>\n                OR @<Language> OR @<LanguageStem> OR @<LanguageStemRange>\n<objectValue> IRI OR LITERAL # rdf:langString breaks on Annotation.object\n<Language> CLOSED { a [sx:Language]; sx:languageTag xsd:string }\n<IriStem> CLOSED { a [sx:IriStem]; sx:stem xsd:string }\n<IriStemRange> CLOSED {\n  a [sx:IriStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<IriStemExclusionList1Plus>\n}\n<LiteralStem> CLOSED { a [sx:LiteralStem]; sx:stem xsd:string }\n<LiteralStemRange> CLOSED {\n  a [sx:LiteralStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<LiteralStemExclusionList1Plus>\n}\n<LanguageStem> CLOSED { a [sx:LanguageStem]; sx:stem xsd:string }\n<LanguageStemRange> CLOSED {\n  a [sx:LanguageStemRange];\n  sx:stem xsd:string OR @<Wildcard>;\n  sx:exclusion @<LanguageStemExclusionList1Plus>\n}\n<Wildcard> BNODE CLOSED {\n  a [sx:Wildcard]\n}\n\n<tripleExpression> @<TripleConstraint> OR @<OneOf> OR @<EachOf> OR CLOSED {  }\n\n<OneOf> CLOSED {\n  a [sx:OneOf] ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:expressions @<tripleExpressionList2Plus> ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<EachOf> CLOSED {\n  a [sx:EachOf] ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:expressions @<tripleExpressionList2Plus> ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<tripleExpressionList2Plus> CLOSED {\n  rdf:first @<tripleExpression> ;\n  rdf:rest @<tripleExpressionList1Plus>\n}\n<tripleExpressionList1Plus> CLOSED {\n  rdf:first @<tripleExpression> ;\n  rdf:rest  [rdf:nil] OR @<tripleExpressionList1Plus>\n}\n\n<TripleConstraint> CLOSED {\n  a [sx:TripleConstraint] ;\n  sx:inverse [true false]? ;\n  sx:negated [true false]? ;\n  sx:min xsd:integer? ;\n  sx:max xsd:integer? ;\n  sx:predicate IRI ;\n  sx:valueExpr @<shapeExpr>? ;\n  sx:semActs @<SemActList1Plus>? ;\n  sx:annotation @<AnnotationList1Plus>?\n}\n\n<IriList1Plus> CLOSED {\n  rdf:first IRI ;\n  rdf:rest  [rdf:nil] OR @<IriList1Plus>\n}\n\n<SemActList1Plus> CLOSED {\n  rdf:first @<SemAct> ;\n  rdf:rest  [rdf:nil] OR @<SemActList1Plus>\n}\n\n<shapeExprList2Plus> CLOSED {\n  rdf:first @<shapeExpr> ;\n  rdf:rest  @<shapeExprList1Plus>\n}\n<shapeExprList1Plus> CLOSED {\n  rdf:first @<shapeExpr> ;\n  rdf:rest  [rdf:nil] OR @<shapeExprList1Plus>\n}\n\n<valueSetValueList1Plus> CLOSED {\n  rdf:first @<valueSetValue> ;\n  rdf:rest  [rdf:nil] OR @<valueSetValueList1Plus>\n}\n\n<AnnotationList1Plus> CLOSED {\n  rdf:first @<Annotation> ;\n  rdf:rest  [rdf:nil] OR @<AnnotationList1Plus>\n}\n\n<IriStemExclusionList1Plus> CLOSED {\n  rdf:first IRI OR @<IriStem> ;\n  rdf:rest  [rdf:nil] OR @<IriStemExclusionList1Plus>\n}\n\n<LiteralStemExclusionList1Plus> CLOSED {\n  rdf:first xsd:string OR @<LiteralStem> ;\n  rdf:rest  [rdf:nil] OR @<LiteralStemExclusionList1Plus>\n}\n\n<LanguageStemExclusionList1Plus> CLOSED {\n  rdf:first xsd:string OR @<LanguageStem> ;\n  rdf:rest  [rdf:nil] OR @<LanguageStemExclusionList1Plus>\n}\n";

    var _this = null;
    /**
     * Fetch Schema document from pod
     * @param file
     */
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

    var NS_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    var NS_DC = 'http://purl.org/dc/elements/1.1/';
    var NS_UI = 'http://www.w3.org/ns/ui#';
    var NS_LAYOUT = 'http://janeirodigital.com/layout#';
    var IRI_Xsd = 'http://www.w3.org/2001/XMLSchema#';
    var IRI_XsdString = IRI_Xsd + "string";
    var SHEX_SCHEMA = 'http://www.w3.org/ns/shex#Schema';
    var TRIPLE_CONSTRAINT = 'TripleConstraint';
    var NODE_CONSTRAINT = 'NodeConstraint';
    var EACH_OF = 'EachOf';
    var CONTEXT = {
        '@context': {
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            ui: 'http://www.w3.org/ns/ui#',
            dc: 'http://purl.org/dc/elements/1.1/',
            'ui:singleTextField': {
                '@type': 'ui:SingleLineTextField'
            },
            'ui:Multiple': {
                '@type': 'ui:Multiple'
            },
            'ui:Group': {
                '@type': 'ui:Group'
            },
            'ui:Classifier': {
                '@type': 'ui:Classifier'
            },
            'ui:EmailField': {
                '@type': 'ui:EmailField'
            },
            'ui:Comment': {
                '@type': 'ui:Comment'
            }
        }
    };
    var RDF$1 = {
        TYPE: 'rdf:type'
    };
    var UI = {
        GROUP: 'ui:group',
        PARTS: 'ui:parts',
        PART: 'ui:part',
        CLONE_PARTS: 'ui:partsClone',
        LABEL: 'ui:label',
        PROPERTY: 'ui:property',
        PARENT_PROPERTY: 'ui:parentProperty',
        BASE: 'ui:base',
        OLDVALUE: 'ui:oldValue',
        VALUE: 'ui:value',
        VALUES: 'ui:values',
        REFERENCE: 'ui:reference',
        NAME: 'ui:name',
        VALID: 'ui:valid',
        REQUIRED_ERROR: 'ui:requiredError',
        VALIDATION_ERROR: 'ui:validationError',
        REQUIRED: 'ui:required',
        PATTERN: 'ui:pattern',
        MIN_LENGTH: 'ui:minLength',
        MAX_LENGTH: 'ui:maxLength',
        MIN_VALUE: 'ui:minValue',
        MAX_VALUE: 'ui:maxValue',
        MIN_DATE_OFFSET: 'ui:mindateOffset',
        MAX_DATE_OFFSET: 'ui:maxdateOffset',
        MAX_DATE_TIME_OFFSET: 'ui:maxdatetimeOffset',
        MIN_DATE_TIME_OFFSET: 'ui:mindatetimeOffset',
        DEFAULT_ERROR: 'ui:defaultError'
    };
    var CONSTRAINTS = {
        nonPositiveInteger: {
            maxValue: 0
        },
        negativeInteger: {
            maxValue: -1
        },
        short: {
            maxValue: 32767,
            minValue: -32768
        },
        byte: {
            maxValue: 127,
            minValue: -128
        },
        nonNegativeInteger: {
            minValue: 0
        },
        unsignedLong: {
            minValue: 0
        },
        unsignedInt: {
            minValue: 0
        },
        unsignedShort: {
            minValue: 0
        },
        unsignedByte: {
            maxValue: 255,
            minValue: 0
        },
        positiveInteger: {
            minValue: 1
        }
    };
    var nsBase = 'http://www.w3.org/ns/ui#';
    var NS = {
        UI: {
            TimeField: nsBase + "TimeField",
            MultipleField: nsBase + "Multiple",
            GroupField: nsBase + "Group",
            Label: nsBase + "label",
            Contents: nsBase + "contents"
        }
    };

    /**
     * Find prefix context to add into object property
     * @param node
     */
    function findContext(node) {
        var contexts = Object.keys(CONTEXT['@context']);
        var prefix = '';
        for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
            var context = contexts_1[_i];
            if (node.includes(CONTEXT['@context'][context])) {
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
                        return [4 /*yield*/, data.from(vocabDoc)[property].label];
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
                        if (!(property === NS.UI.Label || property === NS.UI.Contents)) return [3 /*break*/, 13];
                        textValue = '';
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(data.from(updatedProperty)[field][property]);
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
                            return [2 /*return*/, loopList(data.from(updatedProperty)[field][property])];
                        }
                        _d.label = 14;
                    case 14: return [4 /*yield*/, data.from(updatedProperty)[field][property]];
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
                        _c = __asyncValues(data[field].properties);
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
                        return [4 /*yield*/, turtleToFormUi(data[field], language)];
                    case 13:
                        partsFields_1 = _j.sent();
                        return [3 /*break*/, 16];
                    case 14:
                        if (!(property === partPath)) return [3 /*break*/, 16];
                        return [4 /*yield*/, turtleToFormUi(data[field], language)];
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
                        if (!(!fields[subjectPrefix_1][UI.LABEL] &&
                            !fields[subjectPrefix_1][UI.PARTS] &&
                            fields[subjectPrefix_1][UI.PROPERTY])) return [3 /*break*/, 27];
                        return [4 /*yield*/, findLabel(fields[subjectPrefix_1][UI.PROPERTY])];
                    case 26:
                        label = _j.sent();
                        fields = __assign({}, fields, (_g = {}, _g[subjectPrefix_1] = __assign({}, fields[subjectPrefix_1], (_h = {}, _h[UI.LABEL] = label, _h)), _g));
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
                        uniqueName = uuid();
                        fieldObject = options.fieldObject, value = options.value, property = options.property, podUri = options.podUri;
                        partsKey = fieldObject[UI.PART] ? UI.PART : UI.PARTS;
                        _e = {};
                        _a = partsKey;
                        _b = [{}, children[partsKey]];
                        _f = {};
                        _c = uniqueName;
                        _d = [(_g = {}, _g[UI.NAME] = uniqueName, _g[UI.VALUE] = value, _g)];
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
                        return [4 /*yield*/, data.clearCache(podUri.split('#')[0])
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
                        return [4 /*yield*/, data[currentField.parent[UI.VALUE]][currentField[UI.PROPERTY]]];
                    case 5:
                        result = _d.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, data[currentField[UI.BASE]][currentField[UI.PROPERTY]]];
                    case 7:
                        result = _d.sent();
                        _d.label = 8;
                    case 8:
                        updatedFormObject = __assign({}, updatedFormObject, (_b = {}, _b[field] = __assign({}, currentField, (_c = {}, _c[UI.OLDVALUE] = result.value, _c)), _b));
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
                Object.keys(model[UI.PARTS]).map(function (subject) { return __awaiter(_this, void 0, void 0, function () {
                    var value, property, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                value = model[UI.PARTS][subject];
                                if (!(value[RDF$1.TYPE] === 'http://www.w3.org/ns/ui#Group')) return [3 /*break*/, 2];
                                return [4 /*yield*/, mapData(value, dataSource)];
                            case 1:
                                _c.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                property = value[UI.PROPERTY];
                                /* there are some edge cases in the original that I'm skipping for now: CLASSIFIER */
                                _a = value;
                                _b = UI.VALUE;
                                return [4 /*yield*/, data[dataSource][property]];
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
    /**
     * This function is designed to clean the cloned fields of any values. In some code paths, the clone parts are coming
     * from existing parts lists, and the values and subjects need to be cleaned and regenerated
     * @param podUri
     * @param children - List of children parts used to create a clone
     */
    function cleanClonePartData(children) {
        try {
            Object.keys(children[UI.CLONE_PARTS]).forEach(function (key, index) {
                if (index !== 0) {
                    delete children[UI.CLONE_PARTS][key];
                }
            });
            var cloneKey_1 = Object.keys(children[UI.CLONE_PARTS])[0];
            var partsKey = children[UI.CLONE_PARTS][cloneKey_1][UI.PART] ? UI.PART : UI.PARTS;
            var clonePartsKey = children[UI.CLONE_PARTS][cloneKey_1][UI.PART] || children[UI.CLONE_PARTS][cloneKey_1][UI.PARTS]
                ? Object.keys(children[UI.CLONE_PARTS][cloneKey_1][partsKey])
                : [];
            // Loop over all of the subjects in the cloneParts array. There should only be one, but there may be a bug
            // causing there to be more than one. It shouldn't matter, though.
            clonePartsKey.forEach(function (part) {
                var _a;
                // Get the part itself. This should be the group, or the item inside of the multiple
                // Set the value to null for the part and update the base and parent value so it is a new set of parts instead of
                // tied to the original
                var cloneParts = children[UI.CLONE_PARTS][cloneKey_1][UI.PARTS];
                cloneParts[part] = __assign({}, cloneParts[part], (_a = {}, _a[UI.VALUE] = '', _a[UI.OLDVALUE] = '', _a));
                if (cloneParts[part][UI.PARTS]) {
                    Object.keys(cloneParts[part][UI.PARTS]).forEach(function (subPartKey) {
                        var _a;
                        cloneParts[part][UI.PARTS][subPartKey] = __assign({}, cloneParts[part][UI.PARTS][subPartKey], (_a = {}, _a[UI.VALUE] = '', _a));
                        // If an old value exists, delete it
                        if (cloneParts[part][UI.PARTS][subPartKey][UI.OLDVALUE]) {
                            delete cloneParts[part][UI.PARTS][subPartKey][UI.OLDVALUE];
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
                        return [4 /*yield*/, data.clearCache(podUri.split('#')[0])];
                    case 1:
                        _u.sent();
                        _u.label = 2;
                    case 2:
                        parts = modelUi[UI.PART] ? modelUi[UI.PART] : modelUi[UI.PARTS];
                        fieldsKey = modelUi[UI.PART] ? UI.PART : UI.PARTS;
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
                        property = fieldObject[UI.PROPERTY];
                        isMultiple = fieldObject['rdf:type'].includes('Multiple');
                        isGroup = fieldObject['rdf:type'].includes('Group');
                        hasParts = fieldObject[UI.PARTS] || fieldObject[UI.PART];
                        parentValue = '';
                        children = {};
                        updatedField = [];
                        parentObject = null;
                        if (!property) return [3 /*break*/, 15];
                        newProperty = property.replace(/(^\w+:|^)\/\//, "http://");
                        if (!fieldObject['rdf:type'].includes('Classifier')) return [3 /*break*/, 12];
                        result = void 0;
                        if (!fieldObject[UI.VALUES]) return [3 /*break*/, 8];
                        _c = existPodUri(podUri);
                        if (!_c) return [3 /*break*/, 7];
                        return [4 /*yield*/, data[podUri][newProperty]];
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
                        return [4 /*yield*/, data[podUri].type];
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
                        return [4 /*yield*/, data[podUri][newProperty]];
                    case 13:
                        _e = (_u.sent());
                        _u.label = 14;
                    case 14:
                        field = _e;
                        parentValue = (field && field.value) || '';
                        if (parentUri && parentProperty) {
                            parentObject = (_h = {},
                                _h[UI.VALUE] = podUri,
                                _h[UI.PARENT_PROPERTY] = parentProperty,
                                _h[UI.BASE] = parentUri,
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
                        _f = __asyncValues(data[podUri][property]);
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
                        if (!children[UI.PART]) {
                            throw new Error('Error rendering Form Model - Multiple has no part property');
                        }
                        children[UI.CLONE_PARTS] = lodash.cloneDeep(children[UI.PART]);
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
                        children[UI.CLONE_PARTS] = lodash.cloneDeep(children[UI.PART]);
                        _u.label = 30;
                    case 30:
                        if (!isGroup) return [3 /*break*/, 32];
                        parentPro = parentProperty && parentUri
                            ? (_j = {}, _j[UI.PARENT_PROPERTY] = parentProperty, _j[UI.BASE] = parentUri, _j[UI.VALUE] = podUri, _j) : (_k = {}, _k[UI.PARENT_PROPERTY] = property, _k[UI.BASE] = podUri, _k);
                        return [4 /*yield*/, mapFormModelWithData(fieldObject, podUri, parentProperty, parentUri)];
                    case 31:
                        formModelTemp = _u.sent();
                        newModelUi = __assign({}, newModelUi, (_l = {}, _l[UI.PARTS] = __assign({}, newModelUi[UI.PARTS], (_m = {}, _m[fieldValue] = __assign({}, formModelTemp, parentPro, (_o = {}, _o[UI.REFERENCE] = fieldValue, _o)), _m)), _l));
                        _u.label = 32;
                    case 32:
                        objectValue = parentValue && !isMultiple
                            ? (_p = {},
                                _p[UI.VALUE] = parentValue,
                                _p[UI.OLDVALUE] = parentValue,
                                _p[UI.NAME] = uuid(),
                                _p[UI.BASE] = podUri,
                                _p[UI.VALID] = true,
                                _p) : (_q = {}, _q[UI.NAME] = uuid(), _q[UI.BASE] = podUri, _q[UI.VALID] = true, _q[UI.VALUE] = parentValue, _q);
                        if (fieldObject[UI.VALUES]) {
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
                        partsKey = modelUi[UI.PART] ? UI.PART : UI.PARTS;
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
                    case 0: return [4 /*yield*/, turtleToFormUi(data[documentUri], language)];
                    case 1:
                        model = _b.sent();
                        modelUi = (_a = {
                                '@context': __assign({}, CONTEXT['@context'], { subject: subjectPrefix(documentUri), document: documentPod })
                            },
                            _a[UI.PARTS] = __assign({}, model),
                            _a);
                        return [2 /*return*/, mapFormModelWithData(modelUi, documentPod)];
                }
            });
        });
    }
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

    var formUi = /*#__PURE__*/Object.freeze({
        mapFormObjectWithData: mapFormObjectWithData,
        mapData: mapData,
        mapFormModelWithData: mapFormModelWithData,
        convertFormModel: convertFormModel,
        suffixFromJsonLd: suffixFromJsonLd
    });

    function changeHostProtocol$1(from) {
        if (from.includes('http')) {
            var protocol = window.location.href.split(':')[0];
            return from.replace(/(^\w+:|^)\/\//, protocol + "://");
        }
        return from;
    }
    function getClassifierOptions(from) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedFrom, type, document, _a, options, optionsPromise, quads, quad, deprecated, label, currentPredicateType, currentType;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updatedFrom = changeHostProtocol$1(from);
                        type = from.includes('#') ? from.split('#')[1] : 'Type';
                        if (!updatedFrom) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetchSchema(updatedFrom)];
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
                                new N3Parser().parse(document, function (error, triple) {
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

    var n3Helpers = /*#__PURE__*/Object.freeze({
        getClassifierOptions: getClassifierOptions
    });

    var actionMethod = function (condition, message) {
        return {
            valid: condition,
            errorMessage: message
        };
    };
    var validators = [
        {
            name: UI.REQUIRED,
            action: function (field) {
                return actionMethod(!(field.value === '' || !field.value), field[UI.REQUIRED_ERROR]);
            }
        },
        {
            name: UI.PATTERN,
            action: function (field) {
                var regex = new RegExp(field[UI.PATTERN]);
                return actionMethod(regex.test(field.value), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MIN_LENGTH,
            action: function (field) {
                return actionMethod(field.value.length >= field[UI.MIN_LENGTH], field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MAX_LENGTH,
            action: function (field) {
                return actionMethod(field.value.length <= field[UI.MAX_LENGTH], field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MIN_VALUE,
            action: function (field) {
                if (field['rdf:type'].includes('Date')) {
                    return actionMethod(moment(field.value).isSameOrAfter(moment(field[UI.MIN_VALUE])), field[UI.VALIDATION_ERROR]);
                }
                if (field['rdf:type'] === NS.UI.TimeField) {
                    var _a = field.value.split(':').map(function (v) { return Number(v); }), hour = _a[0], minute = _a[1], second = _a[2];
                    var _b = field[UI.MIN_VALUE]
                        .split(':')
                        .map(function (v) { return Number(v); }), minHour = _b[0], minMinute = _b[1], minSecond = _b[2];
                    var baseTime = new Date();
                    var fieldTime = moment(baseTime).set({ hour: hour, minute: minute, second: second });
                    var maxTime = moment(baseTime).set({
                        hour: minHour,
                        minute: minMinute,
                        second: minSecond
                    });
                    return actionMethod(fieldTime.isSameOrAfter(maxTime), field[UI.VALIDATION_ERROR]);
                }
                return actionMethod(Number(field.value) >= Number(field[UI.MIN_VALUE]), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MAX_VALUE,
            action: function (field) {
                if (field['rdf:type'].includes('Date')) {
                    return actionMethod(moment(field.value).isSameOrBefore(moment(field[UI.MAX_VALUE])), field[UI.VALIDATION_ERROR]);
                }
                if (field['rdf:type'] === NS.UI.TimeField) {
                    var _a = field.value.split(':').map(function (v) { return Number(v); }), hour = _a[0], minute = _a[1], second = _a[2];
                    var _b = field[UI.MAX_VALUE]
                        .split(':')
                        .map(function (v) { return Number(v); }), maxHour = _b[0], maxMinute = _b[1], maxSecond = _b[2];
                    var baseTime = new Date();
                    var fieldTime = moment(baseTime).set({ hour: hour, minute: minute, second: second });
                    var maxTime = moment(baseTime).set({
                        hour: maxHour,
                        minute: maxMinute,
                        second: maxSecond
                    });
                    return actionMethod(fieldTime.isSameOrBefore(maxTime), field[UI.VALIDATION_ERROR]);
                }
                return actionMethod(Number(field.value) <= Number(field[UI.MAX_VALUE]), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MIN_DATE_OFFSET,
            action: function (field) {
                return actionMethod(moment(field.value).isAfter(moment().subtract(field[UI.MIN_DATE_OFFSET], 'd')), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MAX_DATE_OFFSET,
            action: function (field) {
                return actionMethod(moment(field.value).isBefore(moment().add(field[UI.MAX_DATE_OFFSET], 'd')), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MIN_DATE_TIME_OFFSET,
            action: function (field) {
                if (field[UI.MIN_VALUE])
                    return actionMethod(true, 'Skipped validation');
                return actionMethod(moment(field.value).isAfter(moment().subtract(field[UI.MIN_DATE_TIME_OFFSET], 'seconds')), field[UI.VALIDATION_ERROR]);
            }
        },
        {
            name: UI.MAX_DATE_TIME_OFFSET,
            action: function (field) {
                if (field[UI.MAX_VALUE])
                    return actionMethod(true, 'Skipped validation');
                return actionMethod(moment(field.value).isBefore(moment().add(field[UI.MAX_DATE_TIME_OFFSET], 'seconds')), field[UI.VALIDATION_ERROR]);
            }
        }
    ];

    var ListObject = /** @class */ (function () {
        function ListObject(s, p, graph, termFactory) {
            this.s = s;
            this.p = p;
            this.graph = graph;
            this.termFactory = termFactory;
            this.graph = graph;
            this.termFactory = termFactory;
            this.NS_Rdf = NS_RDF;
        }
        /**
         * Add object into Quad using n3
         * For more information please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
         * @param elt
         * @param label
         */
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

    /**
     * Convert ShEx to Form Model
     * We are using n3 library for more info please go to: https://github.com/rdfjs/N3.js/blob/master/README.md
     */
    var ShexFormModel = /** @class */ (function () {
        function ShexFormModel(schema, documentUri) {
            this.schema = schema;
            this.documentUri = documentUri;
            this.termFactory = DataFactory$1;
            this.graph = new N3Store();
            this.meta = { prefixes: schema._prefixes, base: window.location.href };
            this.iriRdftype = NS_RDF + "type";
            this.iriDctitle = NS_DC + "title";
            this.iriUitype = this.iriRdftype;
        }
        ShexFormModel.prototype.getSubjectNode = function (term) {
            return dataModel.namedNode("#" + term);
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
                maxValue = CONSTRAINTS[type] && CONSTRAINTS[type].maxValue && +CONSTRAINTS[type].maxValue;
                minValue = CONSTRAINTS[type] && CONSTRAINTS[type].minValue && +CONSTRAINTS[type].minValue;
            }
            /**
             * Check if there is a number or undefined to add or not the UI:Constraint.
             * The value can be 0
             */
            isNaN(maxValue)
                ? false
                : this.graph.addQuad(this.getSubjectNode(fieldTerm.id), dataModel.namedNode(NS_UI + "maxValue"), this.jsonLdtoRdf({ value: maxValue }));
            isNaN(minValue)
                ? false
                : this.graph.addQuad(this.getSubjectNode(fieldTerm.id), dataModel.namedNode(NS_UI + "minValue"), this.jsonLdtoRdf({ value: minValue }));
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
            var writer = new N3Writer({
                prefixes: { '': IRI_THIS, ui: NS_UI, dc: NS_DC },
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
                graph_1.addQuad(formTerm, namedNode_1(NS_RDF + "type"), namedNode_1("" + NS_UI + type));
                if (label) {
                    /**
                     * insert one quad into n3 store
                     */
                    graph_1.addQuad(formTerm, namedNode_1(this.iriDctitle), literal(label.object.value));
                }
                var currentShape = shape;
                if (!('expression' in shape) || shape.expression.type !== EACH_OF) {
                    currentShape = __assign({}, currentShape, { expression: { expressions: [currentShape.expression] } });
                }
                // The UI vocabulary accepts only lists of atoms.
                var parts_1 = new ListObject(formTerm, namedNode_1(NS_UI + "parts"), graph_1, this.termFactory);
                if (currentShape && currentShape.expression && currentShape.expression.expressions) {
                    currentShape.expression.expressions.forEach(function (te, i) {
                        var tePath = path + "/[" + i + "]";
                        if (te.type !== TRIPLE_CONSTRAINT) {
                            throw Error("expected " + tePath + " of type " + TRIPLE_CONSTRAINT + ", got: " + JSON.stringify(te));
                        }
                        var fieldTerm = 'id' in te ? _this.jsonLdtoRdf(te.id) : blankNode_1(sanitizedPath_1 + "_parts_" + i);
                        var optionsType = _this.findShapeExpressionOptions(te.valueExpr);
                        var fieldType = _this.getFieldType(te.valueExpr);
                        if (optionsType) {
                            var type_1 = optionsType.type;
                            fieldType = type_1;
                        }
                        var needFieldType = namedNode_1(NS_UI + fieldType);
                        // copy annotations
                        if ('annotations' in te) {
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
                                        : blankNode_1(sanitizedPath_1 + "_parts_" + i + "_comment");
                                    /**
                                     * insert one quad into n3 store
                                     */
                                    graph_1.addQuad(commentTerm, namedNode_1(_this.iriUitype), namedNode_1(NS_UI + "Comment"));
                                    graph_1.addQuad(commentTerm, namedNode_1(NS_UI + "contents"), _this.jsonLdtoRdf(a.object));
                                    // add the parts list entry for comment
                                    parts_1.add(commentTerm, sanitizedPath_1 + "_parts_" + i + "_comment");
                                }
                                else if (a && a.predicate && a.predicate.includes('label')) {
                                    /**
                                     * insert one quad into n3 store
                                     */
                                    graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(NS_UI + "label"), _this.jsonLdtoRdf(a.object));
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
                        graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(NS_UI + "property"), _this.jsonLdtoRdf(te.predicate));
                        var valueExpr = typeof te.valueExpr === 'string'
                            ? _this.derefShapeExpression(te.valueExpr)
                            : te.valueExpr;
                        // add what we can guess from the value expression
                        if (valueExpr.type === 'Shape') {
                            needFieldType = null;
                            var groupId = namedNode_1("#" + sanitizedPath_1 + "_parts_" + i + "_group");
                            graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), _this.iriRdftype, namedNode_1(NS_UI + "Multiple"));
                            /**
                             * Adding a Single Part
                             */
                            graph_1.addQuad("#" + fieldTerm.id, namedNode_1(NS_UI + "part"), _this.jsonLdtoRdf("#" + sanitizedPath_1 + "_parts_" + i + "_group"));
                            _this.walkShape(valueExpr, groupId, path + "/@" + _this.localName(te.valueExpr), true);
                        }
                        else if (valueExpr.type === NODE_CONSTRAINT) {
                            var nc = valueExpr;
                            if ('maxlength' in nc) {
                                graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(NS_UI + "maxLength"), _this.jsonLdtoRdf({ value: nc.maxlength }));
                            }
                            if ('pattern' in nc) {
                                graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(NS_UI + "pattern"), _this.jsonLdtoRdf({ value: nc.pattern }));
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
                                graph_1.addQuad(_this.getSubjectNode(fieldTerm.id), namedNode_1(NS_UI + "default"), _this.jsonLdtoRdf({ value: '0' }));
                            }
                            else if (optionsType.type === 'Classifier') {
                                if (optionsType.values) {
                                    var classifierParts = new ListObject("#" + fieldTerm.id, namedNode_1(NS_UI + "values"), graph_1, _this.termFactory);
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
        return ShexFormModel;
    }());

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
                    var parser = shexParser.construct(url, null, { index: true });
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
                    var graph = new N3Store();
                    /**
                     * N3.Parser transforms Turtle, TriG, N-Triples, or N-Quads document into quads through a callback
                     */
                    var parser = new N3Parser({
                        format: 'application/turtle',
                        baseIRI: url
                    });
                    /**
                     * Insert an array of quads
                     */
                    graph.addQuads(parser.parse(schemaText));
                    var shexRSchemaObj = shexParser.construct(url, null, { index: true }).parse(ShExRSchema);
                    var graphParser = shexCore.Validator.construct(shexRSchemaObj, {});
                    /**
                     * Insert an array of quads
                     */
                    var schemaRoot = graph.getQuads(null, shexCore.Util.RDF.type, SHEX_SCHEMA, '')[0].subject; // !!check
                    var val = graphParser.validate(shexCore.Util.makeN3DB(graph), schemaRoot, shexCore.Validator.start);
                    /**
                     * Convert ShEx to ShExJ
                     */
                    return shexCore.Util.ShExRtoShExJ(shexCore.Util.valuesToSchema(shexCore.Util.valToValues(val)));
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
                            formModel = new ShexFormModel(schema, this.documentUri);
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

    var _this$1 = null;
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
                var updatedField = __assign({}, field, (_a = {}, _a[UI.VALID] = true, _a));
                try {
                    var _loop_1 = function (currentValidator) {
                        var _a;
                        if (Object.keys(field).find(function (key) { return key === currentValidator.name; })) {
                            var _b = currentValidator.action(field), valid = _b.valid, errorMessage = _b.errorMessage;
                            if (!valid) {
                                updatedField = __assign({}, updatedField, (_a = {}, _a[UI.VALID] = valid, _a[UI.DEFAULT_ERROR] = errorMessage, _a));
                                return "break";
                            }
                        }
                    };
                    for (var _i = 0, _b = validators; _i < _b.length; _i++) {
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
                            isType = currentField[UI.PROPERTY].includes('type');
                            if (!validatedField[UI.VALID]) return [3 /*break*/, 12];
                            predicate = currentField[UI.PROPERTY];
                            podData = void 0;
                            // Set the field copy object's value to a link to the value (if it is a type field) or the original object's value
                            validatedField[UI.VALUE] = isType ? dataModel.namedNode(currentField.value) : currentField.value;
                            updatedValue = typeof validatedField[UI.VALUE] === 'boolean'
                                ? validatedField[UI.VALUE].toString()
                                : validatedField[UI.VALUE];
                            if (!currentField.parent) return [3 /*break*/, 9];
                            podData = isType
                                ? data[currentField.parent[UI.VALUE]].type
                                : data[currentField.parent[UI.VALUE]][predicate];
                            if (!(currentField[UI.OLDVALUE] && currentField[UI.OLDVALUE] !== '')) return [3 /*break*/, 5];
                            return [4 /*yield*/, podData.set(updatedValue)];
                        case 4:
                            _b.sent();
                            currentField[UI.VALUE] = updatedValue;
                            return [3 /*break*/, 8];
                        case 5:
                            parent_1 = currentField.parent;
                            return [4 /*yield*/, data[parent_1[UI.BASE]][parent_1[UI.PARENT_PROPERTY]].add(dataModel.namedNode(parent_1[UI.VALUE]))];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, podData.add(updatedValue)];
                        case 7:
                            _b.sent();
                            currentField[UI.VALUE] = updatedValue;
                            _b.label = 8;
                        case 8: return [3 /*break*/, 11];
                        case 9:
                            podData = isType
                                ? data[currentField[UI.BASE]].type
                                : data[currentField[UI.BASE]][predicate];
                            return [4 /*yield*/, podData.set(updatedValue)];
                        case 10:
                            _b.sent();
                            currentField[UI.VALUE] = updatedValue;
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
                                    if (!(model[fieldKey][UI.NAME] === field)) return [3 /*break*/, 12];
                                    partToDelete = model[fieldKey];
                                    parts = partToDelete[UI.PARTS] || partToDelete[UI.PART];
                                    if (!parts) return [3 /*break*/, 10];
                                    _i = 0, _b = Object.keys(parts);
                                    _o.label = 4;
                                case 4:
                                    if (!(_i < _b.length)) return [3 /*break*/, 10];
                                    key = _b[_i];
                                    groupParts = partToDelete[UI.PARTS][key][UI.PARTS];
                                    return [4 /*yield*/, FormActions.deleteFieldPod(partToDelete[UI.PARTS][key])
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
                                    return [4 /*yield*/, FormActions.deleteFieldPod(partToDelete[UI.PARTS][key][UI.PARTS][groupPartKey])];
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
                                    if (!model[fieldKey][UI.PART]) return [3 /*break*/, 14];
                                    _f = [{}, model];
                                    _l = {};
                                    _g = fieldKey;
                                    _h = [{}, model[fieldKey]];
                                    _m = {};
                                    _j = UI.PART;
                                    _k = [{}];
                                    return [4 /*yield*/, deleteRecursive(field, model[fieldKey][UI.PART])];
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
                            partsObject = this.formModel[UI.PARTS];
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
                            this.formModel = __assign({}, this.formModel, (_a = {}, _a[UI.PARTS] = __assign({}, updatedModel), _a));
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
                // Get list of parts from the form model
                var partsObject = _this.formModel[UI.PARTS];
                function findField(nodeName, model) {
                    var _loop_2 = function (fieldKey) {
                        var _a;
                        var currentField = model[fieldKey];
                        // If we find the right node
                        if (currentField[UI.NAME] === nodeName) {
                            // Get the key of the first item in clone parts
                            var copiedField = Object.keys(currentField[UI.CLONE_PARTS])[0];
                            // Get a new subject based on the existing subject - so the new fields are siblings in the pod
                            var idLink_1 = FormActions.getSubjectLinkId(currentField[UI.CLONE_PARTS][copiedField][UI.VALUE]);
                            // This field is used for deleting and adding immediately, so this be used before a refresh generates the correct value
                            currentField[UI.BASE] = idLink_1;
                            // Generate a new unique ID for the form object
                            var uniqueName = uuid();
                            var parentProperty = currentField[UI.PROPERTY];
                            var parts = lodash.cloneDeep(currentField[UI.CLONE_PARTS][copiedField]);
                            var cleanedNodes = FormActions.cleanFieldNode(parts);
                            // Updates the new part's name and value, which is a subject for this part
                            var partsNode = currentField[UI.PART];
                            partsNode[uniqueName] = __assign({}, cleanedNodes, (_a = {}, _a[UI.NAME] = uniqueName, _a[UI.VALUE] = idLink_1, _a[UI.PARENT_PROPERTY] = parentProperty, _a));
                            var partsList_1 = partsNode[uniqueName][UI.PARTS];
                            // For each part in the parts list, update the parent property to point at the newly generated subject
                            Object.keys(partsList_1).forEach(function (item) {
                                var _a;
                                partsList_1[item].parent = __assign({}, partsList_1[item].parent, (_a = {}, _a[UI.PARENT_PROPERTY] = currentField[UI.PROPERTY], _a[UI.BASE] = idLink_1, _a[UI.VALUE] = idLink_1, _a));
                                partsList_1[item][UI.BASE] = idLink_1;
                                // If the partsList has it's own parts (such as a Multiple containing a Group) then update all the sub parts to have the same subject in the value field
                                // When we autosave fields, we get the context of just the field, so each field needs to have a copy of it's subject
                                if (partsList_1[item][UI.PARTS]) {
                                    Object.keys(partsList_1[item][UI.PARTS]).forEach(function (subItem) {
                                        var _a;
                                        partsList_1[item][UI.PARTS][subItem].parent = __assign({}, partsList_1[item][UI.PARTS][subItem].parent, (_a = {}, _a[UI.VALUE] = idLink_1, _a));
                                    });
                                }
                            });
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
                return __assign({}, _this.formModel, (_a = {}, _a[UI.PARTS] = __assign({}, updatedParts), _a));
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
            if (updatedField && updatedField[UI.PARTS]) {
                for (var childKey in updatedField[UI.PARTS]) {
                    updatedField = __assign({}, updatedField, (_a = {}, _a[UI.PARTS] = __assign({}, updatedField[UI.PARTS], (_b = {}, _b[childKey] = __assign({}, updatedField[UI.PARTS][childKey], FormActions.cleanFieldNode(updatedField[childKey])), _b)), _a));
                }
            }
            return __assign({}, updatedField, (_c = {}, _c[UI.VALUE] = '', _c[UI.OLDVALUE] = '', _c[UI.NAME] = uuid(), _c));
        };
        /**
         * Delete field from pod
         */
        FormActions.deleteFieldPod = function (field) { return __awaiter(_this$1, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!field[UI.BASE]) return [3 /*break*/, 4];
                        if (!field[UI.PARENT_PROPERTY]) return [3 /*break*/, 2];
                        return [4 /*yield*/, data[field[UI.BASE]][field[UI.PARENT_PROPERTY]].delete(dataModel.namedNode(field[UI.VALUE]))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: 
                    // TODO: for newly added groups,
                    return [4 /*yield*/, data[field[UI.BASE]][field[UI.PROPERTY]].delete(field[UI.VALUE])];
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
    exports.FormModel = FormModel;
    exports.ShexFormModel = ShexFormModel;
    exports.formUi = formUi;
    exports.n3Helper = n3Helpers;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
