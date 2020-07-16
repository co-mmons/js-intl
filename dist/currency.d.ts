export declare class Currency {
    private static _codes;
    static readonly jsonTypeName = "intl/Currency";
    static codes(): string[];
    static fromJSON(json: any): Currency;
    constructor(code: string);
    readonly code: string;
    toString(): string;
    toJSON(): {
        "@type": string;
        code: string;
    };
}
