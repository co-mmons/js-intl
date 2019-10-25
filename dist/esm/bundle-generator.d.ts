export interface IntlBundleItem {
    type?: "message" | null | undefined;
    namespace?: string;
    path: string;
}
export declare namespace IntlBundleItem {
    function intlPolyfill(node_modules?: string): IntlBundleItem;
    function intlRelativeTimePolyfill(node_modules?: string): IntlBundleItem;
}
export declare class IntlBundleGenerator {
    private locales;
    private input;
    private outputFile;
    constructor(locales: string[], input: IntlBundleItem[], outputFile: string);
    generate(): void;
    private extractLocales;
}
