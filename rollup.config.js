export default [
    {
        input: "dist/.tmp/index.js",
        output: [
            {file: "dist/index.esm.js", format: "esm"},
            {file: "dist/index.cjs.js", format: "cjs"},
        ]
    },
    {
        input: "dist/.tmp/BundleGenerator/index.js",
        external: ["fs-extra", "path"],
        output: [
            {file: "dist/BundleGenerator/index.esm.js", format: "esm"},
            {file: "dist/BundleGenerator/index.cjs.js", format: "cjs"},
        ]
    },
    {
        input: "dist/.tmp/GoogleSheetImporter/index.js",
        external: ["fs-extra", "path", "https", "htmlparser2"],
        output: [
            {file: "dist/GoogleSheetImporter/index.esm.js", format: "esm"},
            {file: "dist/GoogleSheetImporter/index.cjs.js", format: "cjs"},
        ]
    },
    {
        external: ["fs-extra", "path", "https", "htmlparser2", "yargs"],
        input: "dist/.tmp/GoogleSheetImporter/cli.js",
        output: {file: "GoogleSheetImporter/cli.js", format: "cjs"}
    }
];