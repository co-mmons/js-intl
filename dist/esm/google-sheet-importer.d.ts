export declare class GoogleSheetImporter {
    constructor();
    private documents;
    addDocument(id: string, worksheet?: string, filterTags?: string[]): void;
    outputPath: string;
    outputType: "json" | "ts";
    defaultLocale: string;
    generate(): Promise<void>;
    private fetchHttps;
    private readSheet;
}
