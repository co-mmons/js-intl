import { BigNumber } from "bignumber.js";
import { Currency } from "./currency";
function toBigNumber(value) {
    if (value instanceof BigNumber) {
        return value;
    }
    else if (typeof value === "number") {
        return new BigNumber(value);
    }
    else if (typeof value === "string") {
        return new BigNumber(value);
    }
    else {
        throw "Given value: " + value + " cannot be converted to BigNumber.";
    }
}
export class Money {
    constructor(currencyOrPrototype, amount) {
        this.$constructor(currencyOrPrototype, amount);
    }
    $constructor(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this._currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this._amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this._amount = toBigNumber(currencyOrPrototype["amount"]);
            this._currency = currencyOrPrototype["currency"] instanceof Currency ? currencyOrPrototype["amount"] : new Currency(currencyOrPrototype["currency"]);
        }
    }
    get currency() {
        return this._currency;
    }
    get amount() {
        return this._amount;
    }
    plus(amount) {
        return new Money(this.currency, this.amount.plus(amount));
    }
    minus(amount) {
        return new Money(this.currency, this.amount.minus(amount));
    }
    times(amount) {
        return new Money(this.currency, this.amount.times(amount));
    }
    dividedBy(amount) {
        return new Money(this.currency, this.amount.dividedBy(amount));
    }
    decimalPlaces(dp, roundingMode) {
        return new Money(this.currency, this.amount.decimalPlaces(dp, roundingMode));
    }
    comparedTo(money) {
        return this.compareTo(money);
    }
    compareTo(money) {
        if (typeof money === "number")
            return this.amount.comparedTo(money);
        else if (money instanceof BigNumber)
            return this.amount.comparedTo(money);
        else if (money)
            return this.amount.comparedTo(money.amount);
        else
            throw new Error("Cannot compare empty value");
    }
    toJSON() {
        return [this.currency.code, this.amount.toString()];
    }
    fromJSON(json) {
        if (typeof json == "string") {
            let currency = json.substr(0, 3);
            let amount = json.substr(3);
            this.$constructor(currency, amount);
            return;
        }
        else if (Array.isArray(json)) {
            if (json.length == 2 && typeof json[0] == "string" && (typeof json[1] == "string" || typeof json[1] == "number")) {
                let currency = json[0];
                let amount = json[1];
                this.$constructor(currency, amount);
                return;
            }
        }
        else if (json.currency && json.amount) {
            this.$constructor(json);
            return;
        }
        throw new Error("Cannot unserialize  '" + json + "' to Money");
    }
    toString() {
        return this.currency.code + this.amount.toString();
    }
}
//# sourceMappingURL=money.js.map