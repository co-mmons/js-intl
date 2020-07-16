import { IntlRef } from "./IntlRef";
export declare class MessageRef extends IntlRef {
    readonly namespace: string;
    readonly key: string;
    readonly values?: {
        [key: string]: any;
    };
    readonly formats?: any;
    static readonly jsonTypeName = "intl/MessageRef";
    static fromJSON(json: any): MessageRef;
    constructor(namespace: string, key: string, values?: {
        [key: string]: any;
    }, formats?: any);
    toJSON(): any;
    toString(): string;
}
