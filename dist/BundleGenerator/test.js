"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BundleGenerator_1 = require("./BundleGenerator");
new BundleGenerator_1.IntlBundleGenerator(["pl-PL", "en-US"], [
    { type: "message", path: "{{NODE_MODULES}}/@co.mmons/test/{{LOCALE}}.json", namespace: "@co.mmons/test" },
    "intl",
    "@formatjs/intl-relativetimeformat"
], "./test/test-out-{{LOCALE}}.js").generate();
//# sourceMappingURL=test.js.map