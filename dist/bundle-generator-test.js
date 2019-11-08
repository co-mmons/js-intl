"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bundle_generator_1 = require("./bundle-generator");
new bundle_generator_1.IntlBundleGenerator(["pl-PL", "en-US"], [
    { type: "message", path: "{{NODE_MODULES}}/@co.mmons/test/{{LOCALE}}.json", namespace: "@co.mmons/test" },
    "intl",
    "@formatjs/intl-relativetimeformat"
], "./test/test-out-{{LOCALE}}.js").generate();
//# sourceMappingURL=bundle-generator-test.js.map