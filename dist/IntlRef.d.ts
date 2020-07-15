declare type RefType = "message" | "decimalFormat";
export declare abstract class IntlRef {
    protected constructor(type: RefType);
    protected readonly refType: RefType;
}
export {};
