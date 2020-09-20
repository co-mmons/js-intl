"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlValue = void 0;
var IntlValue;
(function (IntlValue) {
    function value(value, locale) {
        if (value) {
            return value[locale];
        }
        return undefined;
    }
    IntlValue.value = value;
    function clone(value) {
        if (!value) {
            return value;
        }
        let niu = {};
        for (let i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlValue.clone = clone;
})(IntlValue = exports.IntlValue || (exports.IntlValue = {}));
//# sourceMappingURL=IntlValue.js.map