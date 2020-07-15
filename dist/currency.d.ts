export declare class Currency {
    private static _codes;
    static readonly jsonTypeName = "intl/Currency";
    static codes(): string[];
    static fromJSON(json: any): Currency;
    constructor(code: string);
    readonly code: string;
    toString(): string;
    toJSON(options?: CurrencyJsonOptions): string | {
        "@type": string;
        code: string;
    };
}
export interface CurrencyJsonOptions {
    "@co.mmons/js-intl/Currency"?: {
        output: "@type" | "string";
    };
}
