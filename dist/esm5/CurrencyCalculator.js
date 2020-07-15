import { BigNumber } from "bignumber.js";
import { Currency } from "./Currency";
import { Money } from "./Money";
var CurrencyCalculator = /** @class */ (function () {
    function CurrencyCalculator(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    CurrencyCalculator.main = function () {
        var converter = new CurrencyCalculator(new Currency("PLN"));
        converter.addRate(new Currency("EUR"), new BigNumber(1), new BigNumber(4));
        converter.addRate(new Currency("USD"), new BigNumber(1), new BigNumber(2));
        var eur1 = new Money(new Currency("EUR"), new BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new Currency("PLN")));
        var usd1 = new Money(new Currency("USD"), new BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new Currency("USD")));
        var pln1 = new Money(new Currency("PLN"), new BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new Currency("USD")));
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
        var amountValue = amount instanceof Money ? amount.amount : amount;
        var fromCurrency = amount instanceof Money ? amount.currency : from;
        var toCurrency = amount instanceof Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            var calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money) {
                return new Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        var amountFrom = this.calculateToBase(new BigNumber(1), fromCurrency);
        var amountTo = this.calculateToBase(new BigNumber(1), toCurrency);
        var amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money) {
            return new Money(toCurrency, amountCalculated);
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
export { CurrencyCalculator };
//# sourceMappingURL=CurrencyCalculator.js.map