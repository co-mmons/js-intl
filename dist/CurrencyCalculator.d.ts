import { BigNumber } from "bignumber.js";
import { Currency } from "./Currency";
import { Money } from "./Money";
export interface ExchangeRate {
    currency: Currency;
    amount: BigNumber;
    rate: BigNumber;
}
export declare class CurrencyCalculator {
    readonly baseCurrency: Currency;
    static main(): void;
    constructor(baseCurrency: Currency);
    protected rates: ExchangeRate[];
    private getRate;
    addRate(currency: Currency, amount: BigNumber, rate: BigNumber): void;
    calculate(amount: BigNumber, from: Currency, to: Currency): BigNumber;
    calculate(money: Money, to: Currency): Money;
    protected calculateToBase(amount: BigNumber, fromCurrency: Currency): BigNumber;
}
