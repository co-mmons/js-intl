import { getGlobalValuesVersions } from "./getGlobalValuesVersions";
export function deleteGlobalValuesVersion(versionName, namespace) {
    const versions = getGlobalValuesVersions();
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
//# sourceMappingURL=deleteGlobalValuesVersion.js.map