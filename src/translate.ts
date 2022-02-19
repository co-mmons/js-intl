import IntlMessageFormat from "intl-messageformat";
import {DecimalFormatRef} from "./DecimalFormatRef";
import {extractNamespaceAndKey} from "./extractNamespaceAndKey";
import {getGlobalVersionedValue} from "./getGlobalVersionedValue";
import {IntlContext} from "./IntlContext";
import {isFormattedMessage} from "./isFormattedMessage";
import {MessageRef} from "./MessageRef";
import {ValueKey} from "./ValueKey";
import {ValueRef} from "./ValueRef";

type KeyType = ValueKey | MessageRef | ValueRef;

export function translate(key: KeyType, values?: any, formats?: any): string;

export function translate(context: IntlContext, key: KeyType, values?: any, formats?: any): string;

export function translate(): string {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;

    const key: KeyType = arguments[0 + knownContext];
    let values: any = arguments[1 + knownContext];
    let formats: any = arguments[2 + knownContext];

    const namespaceAndKey = extractNamespaceAndKey(key, context.defaultNamespace);
    if (!namespaceAndKey.namespace) {
        return namespaceAndKey.key;
    }

    if (key instanceof MessageRef) {
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
            if (values[key] instanceof MessageRef) {
                fixedValues[key] = translate(context, values[key]);
            } else if (values[key] instanceof DecimalFormatRef) {
                fixedValues[key] = this.decimalFormat(values[key]);
            } else {
                fixedValues[key] = values[key];
            }
        }

        values = fixedValues;
    }

    let message = getGlobalVersionedValue(context.locales, namespaceAndKey.namespace, namespaceAndKey.key);
    if (!message) {
        message = namespaceAndKey.key.replace(/.+\//g, "").replace(/\|.*/g, "").trim();
    }

    if (typeof message === "string") {

        if (isFormattedMessage(message)) {
            return new IntlMessageFormat(message, context.locales, formats, {ignoreTag: true}).format(values) as string;
        } else {
            return message;
        }

    } else {
        return `${message}`;
    }
}
