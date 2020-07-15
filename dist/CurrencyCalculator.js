"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyCalculator = void 0;
var bignumber_js_1 = require("bignumber.js");
var Currency_1 = require("./Currency");
var Money_1 = require("./Money");
var CurrencyCalculator = /** @class */ (function () {
    function CurrencyCalculator(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    CurrencyCalculator.main = function () {
        var converter = new CurrencyCalculator(new Currency_1.Currency("PLN"));
        converter.addRate(new Currency_1.Currency("EUR"), new bignumber_js_1.BigNumber(1), new bignumber_js_1.BigNumber(4));
        converter.addRate(new Currency_1.Currency("USD"), new bignumber_js_1.BigNumber(1), new bignumber_js_1.BigNumber(2));
        var eur1 = new Money_1.Money(new Currency_1.Currency("EUR"), new bignumber_js_1.BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new Currency_1.Currency("PLN")));
        var usd1 = new Money_1.Money(new Currency_1.Currency("USD"), new bignumber_js_1.BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new Currency_1.Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new Currency_1.Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new Currency_1.Currency("USD")));
        var pln1 = new Money_1.Money(new Currency_1.Currency("PLN"), new bignumber_js_1.BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new Currency_1.Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new Currency_1.Currency("USD")));
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
        var amountValue = amount instanceof Money_1.Money ? amount.amount : amount;
        var fromCurrency = amount instanceof Money_1.Money ? amount.currency : from;
        var toCurrency = amount instanceof Money_1.Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            var calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money_1.Money) {
                return new Money_1.Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        var amountFrom = this.calculateToBase(new bignumber_js_1.BigNumber(1), fromCurrency);
        var amountTo = this.calculateToBase(new bignumber_js_1.BigNumber(1), toCurrency);
        var amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money_1.Money) {
            return new Money_1.Money(toCurrency, amountCalculated);
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
//# sourceMappingURL=CurrencyCalculator.js.map