(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.solidForms = {})));
}(this, (function (exports) { 'use strict';

  var FormModel = /** @class */ (function () {
      function FormModel() {
      }
      Object.defineProperty(FormModel.prototype, "formName", {
          get: function () {
              return 'Form model example';
          },
          enumerable: true,
          configurable: true
      });
      return FormModel;
  }());

  exports.FormModel = FormModel;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=solid-forms.umd.js.map
