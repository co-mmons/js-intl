export declare class MessageRef {
    private _namespace;
    private _key;
    constructor(_namespace: string, _key: string);
    readonly namespace: string;
    readonly key: string;
    toJSON(): string;
    protected fromJSON(json: any): void;
}
