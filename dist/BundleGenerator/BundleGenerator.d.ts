export interface IntlBundleItem {
    type?: "message" | "value" | null | undefined;
    namespace?: string;
    path: string;
    module?: string;
}
export declare namespace IntlBundleItem {
    function intlPolyfill(node_modules?: string): IntlBundleItem;
    function intlRelativeTimePolyfill(node_modules?: string): IntlBundleItem;
}
export declare class IntlBundleGenerator {
    private locales;
    private outputFile;
    private options?;
    constructor(locales: string[], inputs: Array<IntlBundleItem | string>, outputFile: string, options?: {
        nodeModulesPath?: string;
    });
    private readonly items;
    private readonly nodeModulesPath;
    generate(): void;
    private extractLocales;
}
