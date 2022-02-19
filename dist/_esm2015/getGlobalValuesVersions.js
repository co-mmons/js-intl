import { defineGlobals } from "./defineGlobals";
defineGlobals();
export function getGlobalValuesVersions() {
    if (!INTL_VALUES_VERSIONS) {
        INTL_VALUES_VERSIONS = INTL_MESSAGES_VERSIONS = (INTL_MESSAGES_VERSIONS || {});
    }
    return INTL_VALUES_VERSIONS;
}
//# sourceMappingURL=getGlobalValuesVersions.js.map