import { IntlBundleGenerator } from "./bundle-generator";
new IntlBundleGenerator(["pl-PL", "en-US"], [
    { type: "message", path: "{{NODE_MODULES}}/@co.mmons/test/{{LOCALE}}.json", namespace: "@co.mmons/test" },
    "intl",
    "@formatjs/intl-relativetimeformat"
], "./test/test-out-{{LOCALE}}.js").generate();
//# sourceMappingURL=bundle-generator-test.js.map