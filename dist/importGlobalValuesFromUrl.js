"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importGlobalValuesFromUrl = void 0;
const getGlobalValues_1 = require("./getGlobalValues");
const IntlContext_1 = require("./IntlContext");
const importedResources = [];
function importGlobalValuesFromUrl() {
    const knownContext = arguments[0] instanceof IntlContext_1.IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    let url = arguments[0 + knownContext];
    if (!url.startsWith("http")) {
        url = `${context.resourcesLocation}/${url}`;
    }
    const values = (0, getGlobalValues_1.getGlobalValues)();
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
                        for (const namespace in json) {
                            values[namespace] = values[namespace] || {};
                            for (const locale in json[namespace] || {}) {
                                values[namespace][locale] = values[namespace][locale] || {};
                                for (const key in json[namespace][locale] || {}) {
                                    values[namespace][locale][key] = json[namespace][locale][key];
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
exports.importGlobalValuesFromUrl = importGlobalValuesFromUrl;
//# sourceMappingURL=importGlobalValuesFromUrl.js.map