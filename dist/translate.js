"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const intl_messageformat_1 = require("intl-messageformat");
const DecimalFormatRef_1 = require("./DecimalFormatRef");
const extractNamespaceAndKey_1 = require("./extractNamespaceAndKey");
const getGlobalVersionedValue_1 = require("./getGlobalVersionedValue");
const IntlContext_1 = require("./IntlContext");
const isFormattedMessage_1 = require("./isFormattedMessage");
const MessageRef_1 = require("./MessageRef");
function translate() {
    const knownContext = arguments[0] instanceof IntlContext_1.IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const key = arguments[0 + knownContext];
    let values = arguments[1 + knownContext];
    let formats = arguments[2 + knownContext];
    const namespaceAndKey = (0, extractNamespaceAndKey_1.extractNamespaceAndKey)(key, context.defaultNamespace);
    if (!namespaceAndKey.namespace) {
        return namespaceAndKey.key;
    }
    if (key instanceof MessageRef_1.MessageRef) {
        if (!values) {
            values = key.values;
        }
        if (!formats) {
            formats = key.formats;
        }
    }
    if (values) {
        const fixedValues = {};
        for (const key of Object.keys(values)) {
            if (values[key] instanceof MessageRef_1.MessageRef) {
                fixedValues[key] = translate(context, values[key]);
            }
            else if (values[key] instanceof DecimalFormatRef_1.DecimalFormatRef) {
                fixedValues[key] = this.decimalFormat(values[key]);
            }
            else {
                fixedValues[key] = values[key];
            }
        }
        values = fixedValues;
    }
    let message = (0, getGlobalVersionedValue_1.getGlobalVersionedValue)(context.locales, namespaceAndKey.namespace, namespaceAndKey.key);
    if (!message) {
        message = namespaceAndKey.key.replace(/.+\//g, "").replace(/\|.*/g, "").trim();
    }
    if (typeof message === "string") {
        if ((0, isFormattedMessage_1.isFormattedMessage)(message)) {
            return new intl_messageformat_1.default(message, context.locales, formats, { ignoreTag: true }).format(values);
        }
        else {
            return message;
        }
    }
    else {
        return `${message}`;
    }
}
exports.translate = translate;
//# sourceMappingURL=translate.js.map