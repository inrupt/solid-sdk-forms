"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var _constants_1 = require("@constants");
var actionMethod = function (condition, message) {
    return {
        valid: condition,
        errorMessage: message
    };
};
exports.validators = [
    {
        name: _constants_1.UI.REQUIRED,
        action: function (field) {
            return actionMethod(!(field.value === '' || !field.value), field[_constants_1.UI.REQUIRED_ERROR]);
        }
    },
    {
        name: _constants_1.UI.PATTERN,
        action: function (field) {
            var regex = new RegExp(field[_constants_1.UI.PATTERN]);
            return actionMethod(regex.test(field.value), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MIN_LENGTH,
        action: function (field) {
            return actionMethod(field.value.length >= field[_constants_1.UI.MIN_LENGTH], field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MAX_LENGTH,
        action: function (field) {
            return actionMethod(field.value.length <= field[_constants_1.UI.MAX_LENGTH], field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MIN_VALUE,
        action: function (field) {
            if (field['rdf:type'].includes('Date')) {
                return actionMethod(moment_1.default(field.value).isSameOrAfter(moment_1.default(field[_constants_1.UI.MIN_VALUE])), field[_constants_1.UI.VALIDATION_ERROR]);
            }
            if (field['rdf:type'] === _constants_1.NS.UI.TimeField) {
                var _a = field.value.split(':').map(function (v) { return Number(v); }), hour = _a[0], minute = _a[1], second = _a[2];
                var _b = field[_constants_1.UI.MIN_VALUE]
                    .split(':')
                    .map(function (v) { return Number(v); }), minHour = _b[0], minMinute = _b[1], minSecond = _b[2];
                var baseTime = new Date();
                var fieldTime = moment_1.default(baseTime).set({ hour: hour, minute: minute, second: second });
                var maxTime = moment_1.default(baseTime).set({
                    hour: minHour,
                    minute: minMinute,
                    second: minSecond
                });
                return actionMethod(fieldTime.isSameOrAfter(maxTime), field[_constants_1.UI.VALIDATION_ERROR]);
            }
            return actionMethod(Number(field.value) >= Number(field[_constants_1.UI.MIN_VALUE]), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MAX_VALUE,
        action: function (field) {
            if (field['rdf:type'].includes('Date')) {
                return actionMethod(moment_1.default(field.value).isSameOrBefore(moment_1.default(field[_constants_1.UI.MAX_VALUE])), field[_constants_1.UI.VALIDATION_ERROR]);
            }
            if (field['rdf:type'] === _constants_1.NS.UI.TimeField) {
                var _a = field.value.split(':').map(function (v) { return Number(v); }), hour = _a[0], minute = _a[1], second = _a[2];
                var _b = field[_constants_1.UI.MAX_VALUE]
                    .split(':')
                    .map(function (v) { return Number(v); }), maxHour = _b[0], maxMinute = _b[1], maxSecond = _b[2];
                var baseTime = new Date();
                var fieldTime = moment_1.default(baseTime).set({ hour: hour, minute: minute, second: second });
                var maxTime = moment_1.default(baseTime).set({
                    hour: maxHour,
                    minute: maxMinute,
                    second: maxSecond
                });
                return actionMethod(fieldTime.isSameOrBefore(maxTime), field[_constants_1.UI.VALIDATION_ERROR]);
            }
            return actionMethod(Number(field.value) <= Number(field[_constants_1.UI.MAX_VALUE]), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MIN_DATE_OFFSET,
        action: function (field) {
            return actionMethod(moment_1.default(field.value).isAfter(moment_1.default().subtract(field[_constants_1.UI.MIN_DATE_OFFSET], 'd')), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MAX_DATE_OFFSET,
        action: function (field) {
            return actionMethod(moment_1.default(field.value).isBefore(moment_1.default().add(field[_constants_1.UI.MAX_DATE_OFFSET], 'd')), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MIN_DATE_TIME_OFFSET,
        action: function (field) {
            if (field[_constants_1.UI.MIN_VALUE])
                return actionMethod(true, 'Skipped validation');
            return actionMethod(moment_1.default(field.value).isAfter(moment_1.default().subtract(field[_constants_1.UI.MIN_DATE_TIME_OFFSET], 'seconds')), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    },
    {
        name: _constants_1.UI.MAX_DATE_TIME_OFFSET,
        action: function (field) {
            if (field[_constants_1.UI.MAX_VALUE])
                return actionMethod(true, 'Skipped validation');
            return actionMethod(moment_1.default(field.value).isBefore(moment_1.default().add(field[_constants_1.UI.MAX_DATE_TIME_OFFSET], 'seconds')), field[_constants_1.UI.VALIDATION_ERROR]);
        }
    }
];
//# sourceMappingURL=validator.js.map