export declare class MessageRef {
    readonly namespace: string;
    readonly key: string;
    readonly values: {
        [key: string]: any;
    };
    readonly formats: any;
    constructor(namespace: string, key: string, values?: {
        [key: string]: any;
    }, formats?: any);
    toJSON(): (string | {
        [key: string]: any;
    })[];
    toString(): string;
    protected fromJSON(json: any): void;
}
