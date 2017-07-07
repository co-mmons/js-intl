export declare class Country {
    private static _codes;
    static readonly codes: string[];
    constructor(code: string);
    private _code;
    readonly code: string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
