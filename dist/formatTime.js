"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
const formatTimeOrDateOrDateTime_1 = require("./formatTimeOrDateOrDateTime");
const IntlContext_1 = require("./IntlContext");
function formatTime() {
    const knownContext = arguments[0] instanceof IntlContext_1.IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptionsOrOptions = arguments[1 + knownContext];
    const options = arguments[2 + knownContext];
    return (0, formatTimeOrDateOrDateTime_1.formatTimeOrDateOrDateTime)(context, "time", value, predefinedOptionsOrOptions, options);
}
exports.formatTime = formatTime;
//# sourceMappingURL=formatTime.js.map