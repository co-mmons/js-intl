export declare class IntlMessageBundleGenerator {
    private locales;
    private input;
    private outputFile;
    constructor(locales: string[], input: {
        [namespace: string]: string;
    }, outputFile: string);
    generate(): void;
    private extractLocales(locale);
}
