export declare class Currency {
    private static _codes;
    static codes(): string[];
    constructor(code: string);
    private $constructor;
    private _code;
    readonly code: string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
