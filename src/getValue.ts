import {extractNamespaceAndKey} from "./extractNamespaceAndKey";
import {getGlobalVersionedValue} from "./getGlobalVersionedValue";
import {IntlContext} from "./IntlContext";
import {MessageRef} from "./MessageRef";
import {ValueKey} from "./ValueKey";
import {ValueRef} from "./ValueRef";

export function getValue<T extends string | number = string>(context: IntlContext, key: ValueKey | MessageRef | ValueRef): T {

    const namespaceAndKey = extractNamespaceAndKey(key, context.defaultNamespace);
    if (!namespaceAndKey.namespace) {
        return undefined;
    }

    return getGlobalVersionedValue(context.locales, namespaceAndKey.namespace, namespaceAndKey.key);
}
