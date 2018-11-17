import {MessageRef} from "./message-ref";

declare var INTL_MESSAGES: any;

if (typeof window !== "undefined" && !window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}

if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}

const importedResources: string[] = [];

export function importMessages(url: string) {

    if (importedResources.indexOf(url) > -1) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();

        request.onerror = () => {
            reject(new Error(request.statusText));
        };

        request.onload = () => {

            if (request.status >= 200 && request.status < 300) {
                importedResources.push(url);

                try {
                    let json = JSON.parse(request.responseText);

                    if (json) {
                        for (let namespace in json) {
                            INTL_MESSAGES[namespace] = INTL_MESSAGES[namespace] || {};
                            
                            for (let locale in json[namespace] || {}) {
                                INTL_MESSAGES[namespace][locale] = INTL_MESSAGES[namespace][locale] || {};

                                for (let key in json[namespace][locale] || {}) {
                                    INTL_MESSAGES[namespace][locale][key] = json[namespace][locale][key];
                                }
                            }
                        }
                    }

                    resolve();

                } catch (error) {
                    reject(new Error(error));
                }

            } else {
                reject(new Error(request.statusText));
            }
        };

        request.open("GET", url);

    });
}

export function pushMessages(locale: string, namespace: string, messages: {[key: string]: string}) {

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
