"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const currency_1 = require("./currency");
function toBigNumber(value) {
    if (value instanceof bignumber_js_1.BigNumber) {
        return value;
    }
    else if (typeof value === "number") {
        return new bignumber_js_1.BigNumber(value);
    }
    else if (typeof value === "string") {
        return new bignumber_js_1.BigNumber(value);
    }
    else {
        throw "Given value: " + value + " cannot be converted to BigNumber.";
    }
}
class Money {
    constructor(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof currency_1.Currency || typeof currencyOrPrototype === "string") {
            this.currency = currencyOrPrototype instanceof currency_1.Currency ? currencyOrPrototype : new currency_1.Currency(currencyOrPrototype);
            this.amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this.amount = toBigNumber(currencyOrPrototype["amount"]);
            this.currency = currencyOrPrototype["currency"] instanceof currency_1.Currency ? currencyOrPrototype["amount"] : new currency_1.Currency(currencyOrPrototype["currency"]);
        }
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
        else if (money instanceof bignumber_js_1.BigNumber)
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
            this.constructor.call(this, currency, amount);
            return;
        }
        else if (Array.isArray(json)) {
            if (json.length == 2 && typeof json[0] == "string" && (typeof json[1] == "string" || typeof json[1] == "number")) {
                let currency = json[0];
                let amount = json[1];
                this.constructor.call(this, currency, amount);
                return;
            }
        }
        else if (json.currency && json.amount) {
            this.constructor.call(this, json);
            return;
        }
        throw new Error("Cannot unserialize  '" + json + "' to Money");
    }
    toString() {
        return this.currency.code + this.amount.toString();
    }
}
exports.Money = Money;
//# sourceMappingURL=money.js.map