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
var Money = /** @class */ (function () {
    function Money(currencyOrPrototype, amount) {
        this.$constructor(currencyOrPrototype, amount);
    }
    Money.prototype.$constructor = function (currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this._currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this._amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this._amount = toBigNumber(currencyOrPrototype["amount"]);
            this._currency = currencyOrPrototype["currency"] instanceof Currency ? currencyOrPrototype["amount"] : new Currency(currencyOrPrototype["currency"]);
        }
    };
    Object.defineProperty(Money.prototype, "currency", {
        get: function () {
            return this._currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Money.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: true,
        configurable: true
    });
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
    Money.prototype.toJSON = function () {
        return [this.currency.code, this.amount.toString()];
    };
    Money.prototype.fromJSON = function (json) {
        if (typeof json == "string") {
            var currency = json.substr(0, 3);
            var amount = json.substr(3);
            this.$constructor(currency, amount);
            return;
        }
        else if (Array.isArray(json)) {
            if (json.length == 2 && typeof json[0] == "string" && (typeof json[1] == "string" || typeof json[1] == "number")) {
                var currency = json[0];
                var amount = json[1];
                this.$constructor(currency, amount);
                return;
            }
        }
        else if (json.currency && json.amount) {
            this.$constructor(json);
            return;
        }
        throw new Error("Cannot unserialize  '" + json + "' to Money");
    };
    Money.prototype.toString = function () {
        return this.currency.code + this.amount.toString();
    };
    return Money;
}());
export { Money };
//# sourceMappingURL=money.js.map