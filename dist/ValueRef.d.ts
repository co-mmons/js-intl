import { IntlRef } from "./IntlRef";
export declare class ValueRef extends IntlRef {
    static readonly jsonTypeName: string;
    static fromJSON(json: any): ValueRef;
    /**
     * Constructor for a key with default namespace.
     */
    constructor(key: string);
    constructor(namespace: string, key: string);
    readonly namespace: string;
    readonly key: string;
    toJSON(): any;
    toString(): string;
}
