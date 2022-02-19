import { getGlobalValues } from "./getGlobalValues";
import { getGlobalValuesVersions } from "./getGlobalValuesVersions";
export function getGlobalVersionedValue(locales, namespace, key) {
    const versions = getGlobalValuesVersions();
    const values = getGlobalValues();
    for (const locale of locales) {
        if (versions[namespace]) {
            for (const version of versions[namespace]) {
                if (version.messages[locale] && key in version.messages[locale]) {
                    return version.messages[locale][key];
                }
            }
        }
        if (values[namespace] && values[namespace][locale] && values[namespace][locale][key]) {
            return values[namespace][locale][key];
        }
    }
}
//# sourceMappingURL=getGlobalVersionedValue.js.map