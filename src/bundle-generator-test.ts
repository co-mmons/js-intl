import {IntlBundleGenerator} from "./bundle-generator";

new IntlBundleGenerator(["pl-PL", "en-US"], [{type: "message", namespace: "test", path: "./test/test-{{LOCALE}}.json"}], "./test/test-out-{{LOCALE}}.js").generate();