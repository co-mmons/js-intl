"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertGlobalValuesVersion = void 0;
const getGlobalValuesVersions_1 = require("./getGlobalValuesVersions");
function insertGlobalValuesVersion(versionName, priority, namespace, locale, messages) {
    const versionsByNamespace = (0, getGlobalValuesVersions_1.getGlobalValuesVersions)();
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
exports.insertGlobalValuesVersion = insertGlobalValuesVersion;
//# sourceMappingURL=insertGlobalValuesVersion.js.map