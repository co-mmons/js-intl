import {getGlobalValues} from "./getGlobalValues";

export function setGlobalValues(namespace: string, locale: string, newValues: {[key: string]: string}) {

    const values = getGlobalValues();

    if (!values[namespace]) {
        values[namespace] = {};
    }

    if (!values[namespace][locale]) {
        values[namespace][locale] = {};
    }

    Object.assign(values[namespace][locale], newValues);
}
