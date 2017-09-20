import { BigNumber } from "@co.mmons/js-utils/core";
import { Currency } from "./currency";
export declare class Money {
    constructor(currency: Currency, amount: BigNumber | number);
    constructor(currency: string, amount: BigNumber | number);
    private _currency;
    readonly currency: Currency;
    private _amount;
    readonly amount: BigNumber;
    plus(amount: BigNumber | number | string): Money;
    minus(amount: BigNumber | number | string): Money;
    times(amount: BigNumber | number | string): Money;
    dividedBy(amount: BigNumber | number | string): Money;
    comparedTo(money: Money | BigNumber | number): number;
    compareTo(money: Money | BigNumber | number): number;
    toJSON(): {
        currency: any;
        amount: string;
    };
    protected fromJSON(json: any): void;
}
