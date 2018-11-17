import { MessageRef } from "./message-ref";
if (typeof window !== "undefined" && !window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}
if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}
var importedResources = [];
export function importMessages(url) {
    if (importedResources.indexOf(url) > -1) {
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onerror = function () {
            reject(new Error(request.statusText));
        };
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                importedResources.push(url);
                try {
                    var json = JSON.parse(request.responseText);
                    if (json) {
                        for (var namespace in json) {
                            INTL_MESSAGES[namespace] = INTL_MESSAGES[namespace] || {};
                            for (var locale in json[namespace] || {}) {
                                INTL_MESSAGES[namespace][locale] = INTL_MESSAGES[namespace][locale] || {};
                                for (var key in json[namespace][locale] || {}) {
                                    INTL_MESSAGES[namespace][locale][key] = json[namespace][locale][key];
                                }
                            }
                        }
                    }
                    resolve();
                }
                catch (error) {
                    reject(new Error(error));
                }
            }
            else {
                reject(new Error(request.statusText));
            }
        };
        request.open("GET", url);
        request.send();
    });
}
export function pushMessages(locale, namespace, messages) {
    if (!INTL_MESSAGES[namespace]) {
        INTL_MESSAGES[namespace] = {};
    }
    if (!INTL_MESSAGES[namespace][locale]) {
        INTL_MESSAGES[namespace][locale] = {};
    }
    Object.assign(INTL_MESSAGES[namespace][locale], messages);
}
export function findMessage(locales, namespace, key) {
    for (var _i = 0, locales_1 = locales; _i < locales_1.length; _i++) {
        var locale = locales_1[_i];
        if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
            return INTL_MESSAGES[namespace][locale][key];
        }
    }
    return key;
}
export function isMessageNeedsFormatter(message) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
export function extractMessageNamespaceAndKey(namespaceAndKey, defaultNamespace) {
    var result = { namespace: undefined, key: undefined };
    if (namespaceAndKey instanceof MessageRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;
    }
    else if (namespaceAndKey[0] == "#") {
        result.namespace = defaultNamespace;
        result.key = namespaceAndKey.substring(1);
    }
    else {
        var dot = namespaceAndKey.indexOf("#");
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
//# sourceMappingURL=messages.js.map