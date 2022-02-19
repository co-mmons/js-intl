import { getGlobalValuesVersions } from "./getGlobalValuesVersions";
export function insertGlobalValuesVersion(versionName, priority, namespace, locale, messages) {
    const versionsByNamespace = getGlobalValuesVersions();
    const versions = versionsByNamespace[namespace] || (versionsByNamespace[namespace] = []);
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
//# sourceMappingURL=insertGlobalValuesVersion.js.map