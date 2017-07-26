import { IntlHelper } from "./helper";
export declare class Country {
    private static readonly _iso;
    private static readonly _codes;
    static codes(): string[];
    static countries(intl?: IntlHelper): Country[];
    constructor(code: string);
    private _intl;
    private _code;
    readonly code: string;
    readonly alpha2: string;
    readonly alpha3: string;
    name(intl?: IntlHelper): string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
