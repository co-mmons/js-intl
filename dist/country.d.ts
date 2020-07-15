import { MessageRef } from "./MessageRef";
export declare class Country {
    private static readonly _iso;
    private static readonly _codes;
    static readonly jsonTypeName = "intl/Country";
    static fromJSON(json: string | Partial<Country>): Country;
    static codes(): string[];
    static countries(): Country[];
    constructor(code: string);
    constructor(code: Partial<Country>);
    readonly code: string;
    readonly name: MessageRef;
    get alpha2(): string;
    get alpha3(): string;
    equals(country: Country): boolean;
    toString(): string;
    toJSON(options?: CountryJsonOptions): string | {
        "@type": string;
        code: string;
    };
}
export interface CountryJsonOptions {
    "@co.mmons/js-intl/Country"?: {
        output: "@type" | "string";
    };
}
