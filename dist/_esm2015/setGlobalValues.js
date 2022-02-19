import { getGlobalValues } from "./getGlobalValues";
export function setGlobalValues(namespace, locale, newValues) {
    const values = getGlobalValues();
    if (!values[namespace]) {
        values[namespace] = {};
    }
    if (!values[namespace][locale]) {
        values[namespace][locale] = {};
    }
    Object.assign(values[namespace][locale], newValues);
}
//# sourceMappingURL=setGlobalValues.js.map