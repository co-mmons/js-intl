"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
const bignumber_js_1 = require("bignumber.js");
const Currency_1 = require("./Currency");
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
        throw new Error("Value '" + value + "' cannot be converted to BigNumber.");
    }
}
class Money {
    constructor(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof Currency_1.Currency || typeof currencyOrPrototype === "string") {
            this.currency = currencyOrPrototype instanceof Currency_1.Currency ? currencyOrPrototype : new Currency_1.Currency(currencyOrPrototype);
            this.amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this.amount = toBigNumber(currencyOrPrototype.amount);
            this.currency = currencyOrPrototype.currency instanceof Currency_1.Currency ? currencyOrPrototype.currency : new Currency_1.Currency(currencyOrPrototype.currency);
        }
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            return new Money(json.substr(0, 3), json.substr(3));
        }
        else if (Array.isArray(json)) {
            if (json.length === 2 && typeof json[0] === "string" && (typeof json[1] === "string" || typeof json[1] === "number")) {
                const currency = json[0];
                let amount = json[1];
                return new Money(json[0], json[1]);
            }
        }
        else if (json && json.currency && json.amount) {
            return new Money(json.currency, json.amount);
        }
        throw new Error("Cannot unserialize '" + json + "' to Money");
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
    toJSON(options) {
        var _a;
        switch ((_a = options === null || options === void 0 ? void 0 : options["@co.mmons/js-intl/Money"]) === null || _a === void 0 ? void 0 : _a.output) {
            case "string":
                return `${this.currency.code}${this.amount.toString()}`;
            case "array":
                return [this.currency.code, this.amount.toString()];
            default:
                return { "@type": Money.jsonTypeName, currency: this.currency.code, amount: this.amount.toString() };
        }
    }
    toString() {
        return this.currency.code + this.amount.toString();
    }
}
exports.Money = Money;
Money.jsonTypeName = "intl/Money";
//# sourceMappingURL=Money.js.map