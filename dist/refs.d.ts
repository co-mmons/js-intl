import { BigNumber } from "bignumber.js";
declare type RefType = "message" | "decimalFormat";
export declare abstract class IntlRef {
    protected constructor(type: RefType);
    protected readonly refType: RefType;
}
export declare class MessageRef extends IntlRef {
    readonly namespace: string;
    readonly key: string;
    readonly values?: {
        [key: string]: any;
    };
    readonly formats?: any;
    constructor(namespace: string, key: string, values?: {
        [key: string]: any;
    }, formats?: any);
    toJSON(): any;
    toString(): string;
    protected fromJSON(json: any): void;
}
export declare class DecimalFormatRef extends IntlRef {
    constructor(value: number | BigNumber, options?: Intl.NumberFormatOptions);
    readonly value: BigNumber;
    readonly options?: Intl.NumberFormatOptions;
    readonly predefined?: string;
    toJSON(): any;
    fromJSON(json: any): void;
}
export {};
