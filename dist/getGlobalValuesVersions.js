"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalValuesVersions = void 0;
const defineGlobals_1 = require("./defineGlobals");
(0, defineGlobals_1.defineGlobals)();
function getGlobalValuesVersions() {
    if (!INTL_VALUES_VERSIONS) {
        INTL_VALUES_VERSIONS = INTL_MESSAGES_VERSIONS = (INTL_MESSAGES_VERSIONS || {});
    }
    return INTL_VALUES_VERSIONS;
}
exports.getGlobalValuesVersions = getGlobalValuesVersions;
//# sourceMappingURL=getGlobalValuesVersions.js.map