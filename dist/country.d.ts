import { MessageRef } from "./refs";
export declare class Country {
    private static readonly _iso;
    private static readonly _codes;
    static codes(): string[];
    static countries(): Country[];
    constructor(code: string);
    private $constructor;
    equals(country: Country): boolean;
    readonly code: string;
    readonly name: MessageRef;
    readonly alpha2: string;
    readonly alpha3: string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
