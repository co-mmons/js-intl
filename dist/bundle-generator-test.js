"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bundle_generator_1 = require("./bundle-generator");
new bundle_generator_1.IntlBundleGenerator(["pl-PL", "en-US"], [{ type: "message", namespace: "test", path: "./test/test-{{LOCALE}}.json" }], "./test/test-out-{{LOCALE}}.js").generate();
//# sourceMappingURL=bundle-generator-test.js.map