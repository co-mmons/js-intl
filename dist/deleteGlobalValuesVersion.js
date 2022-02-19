"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGlobalValuesVersion = void 0;
const getGlobalValuesVersions_1 = require("./getGlobalValuesVersions");
function deleteGlobalValuesVersion(versionName, namespace) {
    const versions = (0, getGlobalValuesVersions_1.getGlobalValuesVersions)();
    for (const ns in versions) {
        if (!namespace || ns === namespace) {
            for (let i = 0; i < versions[ns].length; i++) {
                if (versions[ns][i].name === versionName) {
                    versions[ns].splice(i, 1);
                    break;
                }
            }
        }
    }
}
exports.deleteGlobalValuesVersion = deleteGlobalValuesVersion;
//# sourceMappingURL=deleteGlobalValuesVersion.js.map