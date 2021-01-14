import { defineGlobals } from "./defineGlobals";
import { MessageRef } from "./MessageRef";
defineGlobals();
const importedResources = [];
export function importMessages(url) {
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
export function setMessages(namespace, locale, messages) {
    if (!INTL_MESSAGES[namespace]) {
        INTL_MESSAGES[namespace] = {};
    }
    if (!INTL_MESSAGES[namespace][locale]) {
        INTL_MESSAGES[namespace][locale] = {};
    }
    Object.assign(INTL_MESSAGES[namespace][locale], messages);
}
/**
 * @deprecated Use {@link setMessages} instead.
 */
export function pushMessages(locale, namespace, messages) {
    setMessages(namespace, locale, messages);
}
export function insertMessagesVersion(versionName, priority, namespace, locale, messages) {
    if (!INTL_MESSAGES_VERSIONS) {
        INTL_MESSAGES_VERSIONS = {};
    }
    const versions = INTL_MESSAGES_VERSIONS[namespace] || (INTL_MESSAGES_VERSIONS[namespace] = []);
    CREATE: {
        for (let i = 0; i < versions.length; i++) {
            if (versions[i].name === versionName) {
                break CREATE;
            }
        }
        versions.unshift({ name: versionName, messages: {} });
    }
    for (let i = 0; i < versions.length; i++) {
        if (versions[i].name === versionName) {
            versions[i].messages[locale] = messages;
        }
    }
}
export function deleteMessagesVersion(versionName, namespace) {
    if (INTL_MESSAGES_VERSIONS) {
        for (const ns in INTL_MESSAGES_VERSIONS) {
            if (!namespace || ns === namespace) {
                for (let i = 0; i < INTL_MESSAGES_VERSIONS[ns].length; i++) {
                    if (INTL_MESSAGES_VERSIONS[ns][i].name === versionName) {
                        INTL_MESSAGES_VERSIONS[ns].splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
}
export function findMessage(locales, namespace, key) {
    for (let locale of locales) {
        if (INTL_MESSAGES_VERSIONS === null || INTL_MESSAGES_VERSIONS === void 0 ? void 0 : INTL_MESSAGES_VERSIONS[namespace]) {
            for (const variant of INTL_MESSAGES_VERSIONS[namespace]) {
                if (variant.messages[locale] && key in variant.messages[locale]) {
                    return variant.messages[locale][key];
                }
            }
        }
        if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
            return INTL_MESSAGES[namespace][locale][key];
        }
    }
    return key.replace(/.+\//g, "").replace(/\|.*/g, "").trim();
}
export function isMessageNeedsFormatter(message) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
export function extractMessageNamespaceAndKey(namespaceAndKey, defaultNamespace) {
    let result = { namespace: undefined, key: undefined };
    if (namespaceAndKey instanceof MessageRef) {
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
//# sourceMappingURL=messages.js.map