"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalValues = void 0;
const getGlobalValues_1 = require("./getGlobalValues");
function setGlobalValues(namespace, locale, newValues) {
    const values = (0, getGlobalValues_1.getGlobalValues)();
    if (!values[namespace]) {
        values[namespace] = {};
    }
    if (!values[namespace][locale]) {
        values[namespace][locale] = {};
    }
    Object.assign(values[namespace][locale], newValues);
}
exports.setGlobalValues = setGlobalValues;
//# sourceMappingURL=setGlobalValues.js.map