import { BigNumber } from "bignumber.js";
import { Currency } from "./Currency";
export declare class Money {
    static readonly jsonTypeName = "intl/Money";
    static fromJSON(json: any): Money;
    constructor(currency: Currency, amount: BigNumber | number | string);
    constructor(currency: string, amount: BigNumber | number | string);
    readonly currency: Currency;
    readonly amount: BigNumber;
    plus(amount: BigNumber | number | string): Money;
    minus(amount: BigNumber | number | string): Money;
    times(amount: BigNumber | number | string): Money;
    dividedBy(amount: BigNumber | number | string): Money;
    decimalPlaces(dp: number, roundingMode: BigNumber.RoundingMode): Money;
    comparedTo(money: Money | BigNumber | number): number;
    compareTo(money: Money | BigNumber | number): number;
    toJSON(options?: MoneyJsonOptions): string | string[] | {
        "@type": string;
        currency: string;
        amount: string;
    };
    toString(): string;
}
export interface MoneyJsonOptions {
    "@co.mmons/js-intl/Money"?: {
        output: "@type" | "string" | "array";
    };
}
