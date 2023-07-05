"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNamespaceAndKey = void 0;
const MessageRef_1 = require("./MessageRef");
const ValueRef_1 = require("./ValueRef");
function extractNamespaceAndKey(namespaceAndKey, defaultNamespace) {
    const result = { namespace: undefined, key: undefined };
    if (namespaceAndKey instanceof MessageRef_1.MessageRef || namespaceAndKey instanceof ValueRef_1.ValueRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;
    }
    else if (Array.isArray(namespaceAndKey)) {
        result.namespace = namespaceAndKey[0];
        result.key = namespaceAndKey[1];
    }
    else if (namespaceAndKey[0] === "#") {
        result.namespace = defaultNamespace;
        result.key = namespaceAndKey.substring(1);
    }
    else {
        let dot = namespaceAndKey.indexOf("#");
        if (dot > -1) {
            result.namespace = namespaceAndKey.substring(0, dot);
            result.key = namespaceAndKey.substring(dot + 1);
        }
        else {
            result.namespace = defaultNamespace;
            result.key = namespaceAndKey;
        }
    }
    return result;
}
exports.extractNamespaceAndKey = extractNamespaceAndKey;
//# sourceMappingURL=extractNamespaceAndKey.js.map