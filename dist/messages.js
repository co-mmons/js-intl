"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_ref_1 = require("./message-ref");
if (typeof window !== "undefined" && !window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}
if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}
const importedResources = [];
function importMessages(url) {
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
exports.importMessages = importMessages;
function pushMessages(locale, namespace, messages) {
    if (!INTL_MESSAGES[namespace]) {
        INTL_MESSAGES[namespace] = {};
    }
    if (!INTL_MESSAGES[namespace][locale]) {
        INTL_MESSAGES[namespace][locale] = {};
    }
    Object.assign(INTL_MESSAGES[namespace][locale], messages);
}
exports.pushMessages = pushMessages;
function findMessage(locales, namespace, key) {
    for (let locale of locales) {
        if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
            return INTL_MESSAGES[namespace][locale][key];
        }
    }
    return key.replace(/.+\//g, "").replace(/\|.*/g, "").trim();
}
exports.findMessage = findMessage;
function isMessageNeedsFormatter(message) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
exports.isMessageNeedsFormatter = isMessageNeedsFormatter;
function extractMessageNamespaceAndKey(namespaceAndKey, defaultNamespace) {
    let result = { namespace: undefined, key: undefined };
    if (namespaceAndKey instanceof message_ref_1.MessageRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;
    }
    else if (namespaceAndKey[0] == "#") {
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
exports.extractMessageNamespaceAndKey = extractMessageNamespaceAndKey;
//# sourceMappingURL=messages.js.map