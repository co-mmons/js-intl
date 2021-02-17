import { IntlRef } from "./IntlRef";
export declare class MessageRef extends IntlRef {
    static readonly jsonTypeName = "intl/MessageRef";
    static fromJSON(json: any): MessageRef;
    /**
     * Constructor for a key with default namespace.
     */
    constructor(key: string, values?: {
        [key: string]: any;
    }, formats?: any);
    constructor(namespace: string, key: string, values?: {
        [key: string]: any;
    }, formats?: any);
    readonly namespace: string;
    readonly key: string;
    readonly values?: {
        [key: string]: any;
    };
    readonly formats?: any;
    toJSON(): any;
    toString(): string;
}
