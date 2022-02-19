"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
const intl_messageformat_1 = require("intl-messageformat");
const IntlContext_1 = require("./IntlContext");
function formatMessage() {
    const knownContext = arguments[0] instanceof IntlContext_1.IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const message = arguments[0 + knownContext];
    let values = arguments[1 + knownContext];
    let formats = arguments[2 + knownContext];
    return new intl_messageformat_1.default(message, context.locales, formats, { ignoreTag: true }).format(values);
}
exports.formatMessage = formatMessage;
//# sourceMappingURL=formatMessage.js.map