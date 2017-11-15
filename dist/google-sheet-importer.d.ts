export declare class GoogleSheetImporter {
    constructor();
    private documents;
    addDocument(id: string, worksheet?: string, filterTags?: string[]): void;
    outputPath: string;
    outputType: "json" | "ts";
    generate(): Promise<void>;
    private fetchHttps(url);
    private readDocument(document);
}
