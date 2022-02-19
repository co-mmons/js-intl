declare type RefType = "value" | "message" | "decimalFormat";
export declare abstract class IntlRef {
    protected constructor(type: RefType);
    protected readonly refType: RefType;
}
export {};
