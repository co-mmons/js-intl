import {BigNumber} from "bignumber.js";
import {Currency} from "./Currency";

function toBigNumber(value: number | BigNumber | string | any): BigNumber {

    if (value instanceof BigNumber) {
        return value;
    } else if (typeof value === "number") {
        return new BigNumber(value);
    } else if (typeof value === "string") {
        return new BigNumber(value);
    } else {
        throw new Error("Value '" + value + "' cannot be converted to BigNumber.");
    }
}

export class Money {

    static readonly jsonTypeName = "intl/Money";

    static fromJSON(json: any) {

        if (typeof json === "string") {
            return new Money(json.substr(0, 3), json.substr(3));

        } else if (Array.isArray(json)) {
            if (json.length === 2 && typeof json[0] === "string" && (typeof json[1] === "string" || typeof json[1] === "number")) {
                const currency = json[0];
                let amount = json[1];
                return new Money(json[0], json[1]);
            }

        } else if (json && json.currency && json.amount) {
            return new Money(json.currency, json.amount);
        }

        throw new Error("Cannot unserialize '" + json + "' to Money");
    }

    constructor(currency: Currency, amount: BigNumber | number | string);

    constructor(currency: string, amount: BigNumber | number | string);

    constructor(currencyOrPrototype: Currency | string | Partial<Money>, amount?: number | BigNumber | string) {

        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this.currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this.amount = toBigNumber(amount);

        } else if (currencyOrPrototype) {
            this.amount = toBigNumber(currencyOrPrototype.amount);
            this.currency = currencyOrPrototype.currency instanceof Currency ? currencyOrPrototype.currency : new Currency(currencyOrPrototype.currency);
        }
    }

    readonly currency: Currency;

    readonly amount: BigNumber;

    plus(amount: BigNumber | number | string): Money {
        return new Money(this.currency, this.amount.plus(amount));
    }

    minus(amount: BigNumber | number | string): Money {
        return new Money(this.currency, this.amount.minus(amount));
    }

    times(amount: BigNumber | number | string): Money {
        return new Money(this.currency, this.amount.times(amount));
    }

    dividedBy(amount: BigNumber | number | string): Money {
        return new Money(this.currency, this.amount.dividedBy(amount));
    }

    decimalPlaces(dp: number, roundingMode: BigNumber.RoundingMode): Money {
        return new Money(this.currency, this.amount.decimalPlaces(dp, roundingMode));
    }

    comparedTo(money: Money | BigNumber | number): number {
        return this.compareTo(money);
    }

    compareTo(money: Money | BigNumber | number): number {
        if (typeof money === "number") return this.amount.comparedTo(money);
        else if (money instanceof BigNumber) return this.amount.comparedTo(money);
        else if (money) return this.amount.comparedTo(money.amount);
        else throw new Error("Cannot compare empty value");
    }

    toJSON(options?: MoneyJsonOptions) {

        switch (options?.["@co.mmons/js-intl/Money"]?.output) {
            case "string":
                return `${this.currency.code}${this.amount.toString()}`;
            case "array":
                return [this.currency.code, this.amount.toString()];
            default:
                return {"@type": Money.jsonTypeName, currency: this.currency.code, amount: this.amount.toString()};
        }
    }

    toString() {
        return this.currency.code + this.amount.toString();
    }
}

export interface MoneyJsonOptions {
    "@co.mmons/js-intl/Money"?: {output: "@type" | "string" | "array"}
}
