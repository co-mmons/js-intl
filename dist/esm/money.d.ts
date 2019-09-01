import { BigNumber } from "bignumber.js";
import { Currency } from "./currency";
export declare class Money {
    constructor(currency: Currency, amount: BigNumber | number);
    constructor(currency: string, amount: BigNumber | number);
    readonly currency: Currency;
    readonly amount: BigNumber;
    plus(amount: BigNumber | number | string): Money;
    minus(amount: BigNumber | number | string): Money;
    times(amount: BigNumber | number | string): Money;
    dividedBy(amount: BigNumber | number | string): Money;
    decimalPlaces(dp: number, roundingMode: BigNumber.RoundingMode): Money;
    comparedTo(money: Money | BigNumber | number): number;
    compareTo(money: Money | BigNumber | number): number;
    toJSON(): string[];
    protected fromJSON(json: any): void;
    toString(): string;
}
