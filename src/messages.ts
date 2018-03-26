import {MessageRef} from ".";

declare var INTL_MESSAGES: any;

if (typeof window !== "undefined" && !window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}

if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}

export function importMessages(locale: string, namespace: string, messages: {[key: string]: string}) {
    
    if (!INTL_MESSAGES[namespace]) {
        INTL_MESSAGES[namespace] = {};
    }

    if (!INTL_MESSAGES[namespace][locale]) {
        INTL_MESSAGES[namespace][locale] = {};
    }

    Object.assign(INTL_MESSAGES[namespace][locale], messages);
}

export function findMessage(locales: string[], namespace: string, key: string) {

    for (let locale of locales) {
        if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
            return INTL_MESSAGES[namespace][locale][key];
        }
    }

    return key;
}

export function isMessageNeedsFormatter(message: string) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}

export function extractMessageNamespaceAndKey(namespaceAndKey: string | MessageRef, defaultNamespace?: string): {namespace: string, key: string} {

    let result = {namespace: undefined, key: undefined};

    if (namespaceAndKey instanceof MessageRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;

    } else if (namespaceAndKey[0] == "#") {
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
