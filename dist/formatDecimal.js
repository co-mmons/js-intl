"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDecimal = void 0;
const DecimalFormatRef_1 = require("./DecimalFormatRef");
const defineGlobals_1 = require("./defineGlobals");
const formatNumber_1 = require("./formatNumber");
const IntlContext_1 = require("./IntlContext");
(0, defineGlobals_1.defineGlobals)();
function formatDecimal() {
    const knownContext = arguments[0] instanceof IntlContext_1.IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptions = arguments[1 + knownContext];
    const additionalOptions = arguments[2 + knownContext];
    if (value instanceof DecimalFormatRef_1.DecimalFormatRef) {
        return (0, formatNumber_1.formatNumber)(context, "decimal", value.value, value.predefined, value.options);
    }
    return (0, formatNumber_1.formatNumber)(context, "decimal", value, predefinedOptions, additionalOptions);
}
exports.formatDecimal = formatDecimal;
//# sourceMappingURL=formatDecimal.js.map