import {MessageRef} from "./MessageRef";
import {ValueRef} from "./ValueRef";

export function extractNamespaceAndKey(namespaceAndKey: string | MessageRef | ValueRef | [namespace: string, key: string], defaultNamespace?: string): {namespace: string, key: string} {

    const result = {namespace: undefined, key: undefined};

    if (namespaceAndKey instanceof MessageRef || namespaceAndKey instanceof ValueRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;
    } else if (Array.isArray(namespaceAndKey)) {
        result.namespace = namespaceAndKey[0];
        result.key = namespaceAndKey[1];

    } else if (namespaceAndKey[0] === "#") {
        result.namespace = defaultNamespace;
        result.key = namespaceAndKey.substring(1);

    } else {
        let dot = namespaceAndKey.indexOf("#");
        if (dot > -1) {
            result.namespace = namespaceAndKey.substring(0, dot);
            result.key = namespaceAndKey.substring(dot + 1);
        } else {
            result.namespace = defaultNamespace;
            result.key = namespaceAndKey;
        }
    }

    return result;
}
