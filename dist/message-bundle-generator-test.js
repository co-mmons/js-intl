"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_bundle_generator_1 = require("./message-bundle-generator");
new message_bundle_generator_1.IntlMessageBundleGenerator(["pl-PL", "en-US"], { "test": "./test/test-{{LOCALE}}.json" }, "./test/test-out-{{LOCALE}}.js").generate();
//# sourceMappingURL=message-bundle-generator-test.js.map