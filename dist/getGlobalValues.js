"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalValues = void 0;
const defineGlobals_1 = require("./defineGlobals");
(0, defineGlobals_1.defineGlobals)();
function getGlobalValues() {
    if (!INTL_VALUES) {
        INTL_VALUES = INTL_MESSAGES = (INTL_MESSAGES || {});
    }
    return INTL_VALUES;
}
exports.getGlobalValues = getGlobalValues;
//# sourceMappingURL=getGlobalValues.js.map