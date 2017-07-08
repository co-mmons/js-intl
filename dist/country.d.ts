import { IntlHelper } from "./helper";
export declare class Country {
    private static _codes;
    static codes(): string[];
    static countries(): Country[];
    constructor(code: string);
    private _code;
    readonly code: string;
    name(intl: IntlHelper): string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
