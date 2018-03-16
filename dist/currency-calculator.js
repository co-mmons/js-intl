"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@co.mmons/js-utils/core");
var currency_1 = require("./currency");
var money_1 = require("./money");
var CurrencyCalculator = (function () {
    function CurrencyCalculator(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    CurrencyCalculator.main = function () {
        var converter = new CurrencyCalculator(new currency_1.Currency("PLN"));
        converter.addRate(new currency_1.Currency("EUR"), new core_1.BigNumber(1), new core_1.BigNumber(4));
        converter.addRate(new currency_1.Currency("USD"), new core_1.BigNumber(1), new core_1.BigNumber(2));
        var eur1 = new money_1.Money(new currency_1.Currency("EUR"), new core_1.BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new currency_1.Currency("PLN")));
        var usd1 = new money_1.Money(new currency_1.Currency("USD"), new core_1.BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new currency_1.Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new currency_1.Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new currency_1.Currency("USD")));
        var pln1 = new money_1.Money(new currency_1.Currency("PLN"), new core_1.BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new currency_1.Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new currency_1.Currency("USD")));
    };
    CurrencyCalculator.prototype.getRate = function (currency) {
        for (var _i = 0, _a = this.rates; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.currency.code == currency.code) {
                return r;
            }
        }
    };
    CurrencyCalculator.prototype.addRate = function (currency, amount, rate) {
        this.rates.push({ currency: currency, amount: amount, rate: rate });
    };
    CurrencyCalculator.prototype.calculate = function (amount, from, to) {
        var amountValue = amount instanceof money_1.Money ? amount.amount : amount;
        var fromCurrency = amount instanceof money_1.Money ? amount.currency : from;
        var toCurrency = amount instanceof money_1.Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            var calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof money_1.Money) {
                return new money_1.Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        var amountFrom = this.calculateToBase(new core_1.BigNumber(1), fromCurrency);
        var amountTo = this.calculateToBase(new core_1.BigNumber(1), toCurrency);
        var amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof money_1.Money) {
            return new money_1.Money(toCurrency, amountCalculated);
        }
        else {
            return amountCalculated;
        }
    };
    CurrencyCalculator.prototype.calculateToBase = function (amount, fromCurrency) {
        if (this.baseCurrency.code == fromCurrency.code) {
            return amount;
        }
        var er = this.getRate(fromCurrency);
        return er.rate.dividedBy(er.amount).times(amount);
    };
    return CurrencyCalculator;
}());
exports.CurrencyCalculator = CurrencyCalculator;
//# sourceMappingURL=currency-calculator.js.map