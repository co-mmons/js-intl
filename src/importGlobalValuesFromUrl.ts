import {getGlobalValues} from "./getGlobalValues";
import {IntlContext} from "./IntlContext";

const importedResources: string[] = [];

export async function importGlobalValuesFromUrl(url: string);

export async function importGlobalValuesFromUrl(context: IntlContext, url: string);

export function importGlobalValuesFromUrl(): Promise<void> {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;

    let url: string = arguments[0 + knownContext];
    if (!url.startsWith("http")) {
        url = `${context.resourcesLocation}/${url}`;
    }

    const values = getGlobalValues();

    if (importedResources.indexOf(url) > -1) {
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {

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

                } catch (error) {
                    reject(new Error(error));
                }

            } else {
                reject(new Error(request.statusText));
            }
        };

        request.open("GET", url);
        request.send();

    });

}
