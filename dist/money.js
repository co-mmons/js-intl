"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@co.mmons/js-utils/core");
var currency_1 = require("./currency");
function toBigNumber(value) {
    if (value instanceof core_1.BigNumber) {
        return value;
    }
    else if (typeof value === "number") {
        return new core_1.BigNumber(value);
    }
    else if (typeof value === "string") {
        return new core_1.BigNumber(value);
    }
    else {
        throw "Given value: " + value + " cannot be converted to BigNumber.";
    }
}
var Money = (function () {
    function Money(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof currency_1.Currency || typeof currencyOrPrototype === "string") {
            this._currency = currencyOrPrototype instanceof currency_1.Currency ? currencyOrPrototype : new currency_1.Currency(currencyOrPrototype);
            this._amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this._amount = toBigNumber(currencyOrPrototype["amount"]);
            this._currency = currencyOrPrototype["currency"] instanceof currency_1.Currency ? currencyOrPrototype["amount"] : new currency_1.Currency(currencyOrPrototype["currency"]);
        }
    }
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
        return new Money(this._currency, this._amount.plus(amount));
    };
    Money.prototype.minus = function (amount) {
        return new Money(this._currency, this._amount.minus(amount));
    };
    Money.prototype.times = function (amount) {
        return new Money(this._currency, this._amount.times(amount));
    };
    Money.prototype.dividedBy = function (amount) {
        return new Money(this._currency, this._amount.dividedBy(amount));
    };
    Money.prototype.comparedTo = function (money) {
        return this.compareTo(money);
    };
    Money.prototype.compareTo = function (money) {
        if (typeof money === "number")
            return this._amount.comparedTo(money);
        else if (money instanceof core_1.BigNumber)
            return this._amount.comparedTo(money);
        else if (money)
            return this._amount.comparedTo(money.amount);
        else
            throw new Error("Cannot compare empty value");
    };
    Money.prototype.toJSON = function () {
        return { currency: this._currency.toJSON(), amount: this._amount.toJSON() };
    };
    Money.prototype.fromJSON = function (json) {
        this._currency = new currency_1.Currency(json.currency);
        this._amount = new core_1.BigNumber(json.amount);
    };
    return Money;
}());
exports.Money = Money;
//# sourceMappingURL=money.js.map