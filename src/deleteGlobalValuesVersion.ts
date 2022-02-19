import {getGlobalValuesVersions} from "./getGlobalValuesVersions";

export function deleteGlobalValuesVersion(versionName: string);

export function deleteGlobalValuesVersion(versionName: string, namespace: string);

export function deleteGlobalValuesVersion(versionName: string, namespace?: string) {
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
