export interface IntlBundleItem {
    type?: "message" | null | undefined;
    namespace?: string;
    path: string;
}
export declare class IntlBundleGenerator {
    private locales;
    private input;
    private outputFile;
    constructor(locales: string[], input: IntlBundleItem[], outputFile: string);
    generate(): void;
    private extractLocales;
}
