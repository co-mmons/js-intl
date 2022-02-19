"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
const extractNamespaceAndKey_1 = require("./extractNamespaceAndKey");
const getGlobalVersionedValue_1 = require("./getGlobalVersionedValue");
function getValue(context, key) {
    const namespaceAndKey = (0, extractNamespaceAndKey_1.extractNamespaceAndKey)(key, context.defaultNamespace);
    if (!namespaceAndKey.namespace) {
        return undefined;
    }
    return (0, getGlobalVersionedValue_1.getGlobalVersionedValue)(context.locales, namespaceAndKey.namespace, namespaceAndKey.key);
}
exports.getValue = getValue;
//# sourceMappingURL=getValue.js.map