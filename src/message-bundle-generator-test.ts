import {IntlMessageBundleGenerator} from "./message-bundle-generator";

new IntlMessageBundleGenerator(["pl-PL", "en-US"], {"test": "./test/test-{{LOCALE}}.json"}, "./test/test-out-{{LOCALE}}.js").generate();