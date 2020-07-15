import { BigNumber } from "bignumber.js";
import { Currency } from "./Currency";
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
        throw new Error("Value '" + value + "' cannot be converted to BigNumber.");
    }
}
var Money = /** @class */ (function () {
    function Money(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this.currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this.amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this.amount = toBigNumber(currencyOrPrototype.amount);
            this.currency = currencyOrPrototype.currency instanceof Currency ? currencyOrPrototype.currency : new Currency(currencyOrPrototype.currency);
        }
    }
    Money.fromJSON = function (json) {
        if (typeof json === "string") {
            return new Money(json.substr(0, 3), json.substr(3));
        }
        else if (Array.isArray(json)) {
            if (json.length === 2 && typeof json[0] === "string" && (typeof json[1] === "string" || typeof json[1] === "number")) {
                var currency = json[0];
                var amount = json[1];
                return new Money(json[0], json[1]);
            }
        }
        else if (json && json.currency && json.amount) {
            return new Money(json.currency, json.amount);
        }
        throw new Error("Cannot unserialize '" + json + "' to Money");
    };
    Money.prototype.plus = function (amount) {
        return new Money(this.currency, this.amount.plus(amount));
    };
    Money.prototype.minus = function (amount) {
        return new Money(this.currency, this.amount.minus(amount));
    };
    Money.prototype.times = function (amount) {
        return new Money(this.currency, this.amount.times(amount));
    };
    Money.prototype.dividedBy = function (amount) {
        return new Money(this.currency, this.amount.dividedBy(amount));
    };
    Money.prototype.decimalPlaces = function (dp, roundingMode) {
        return new Money(this.currency, this.amount.decimalPlaces(dp, roundingMode));
    };
    Money.prototype.comparedTo = function (money) {
        return this.compareTo(money);
    };
    Money.prototype.compareTo = function (money) {
        if (typeof money === "number")
            return this.amount.comparedTo(money);
        else if (money instanceof BigNumber)
            return this.amount.comparedTo(money);
        else if (money)
            return this.amount.comparedTo(money.amount);
        else
            throw new Error("Cannot compare empty value");
    };
    Money.prototype.toJSON = function (options) {
        var _a;
        switch ((_a = options === null || options === void 0 ? void 0 : options["@co.mmons/js-intl/Money"]) === null || _a === void 0 ? void 0 : _a.output) {
            case "string":
                return "" + this.currency.code + this.amount.toString();
            case "array":
                return [this.currency.code, this.amount.toString()];
            default:
                return { "@type": Money.jsonTypeName, currency: this.currency.code, amount: this.amount.toString() };
        }
    };
    Money.prototype.toString = function () {
        return this.currency.code + this.amount.toString();
    };
    Money.jsonTypeName = "intl/Money";
    return Money;
}());
export { Money };
//# sourceMappingURL=Money.js.map