"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyCalculator = void 0;
const bignumber_js_1 = require("bignumber.js");
const Currency_1 = require("./Currency");
const Money_1 = require("./Money");
class CurrencyCalculator {
    constructor(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    static main() {
        let converter = new CurrencyCalculator(new Currency_1.Currency("PLN"));
        converter.addRate(new Currency_1.Currency("EUR"), new bignumber_js_1.BigNumber(1), new bignumber_js_1.BigNumber(4));
        converter.addRate(new Currency_1.Currency("USD"), new bignumber_js_1.BigNumber(1), new bignumber_js_1.BigNumber(2));
        let eur1 = new Money_1.Money(new Currency_1.Currency("EUR"), new bignumber_js_1.BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new Currency_1.Currency("PLN")));
        let usd1 = new Money_1.Money(new Currency_1.Currency("USD"), new bignumber_js_1.BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new Currency_1.Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new Currency_1.Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new Currency_1.Currency("USD")));
        let pln1 = new Money_1.Money(new Currency_1.Currency("PLN"), new bignumber_js_1.BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new Currency_1.Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new Currency_1.Currency("USD")));
    }
    getRate(currency) {
        for (let r of this.rates) {
            if (r.currency.code == currency.code) {
                return r;
            }
        }
    }
    addRate(currency, amount, rate) {
        this.rates.push({ currency: currency, amount: amount, rate: rate });
    }
    calculate(amount, from, to) {
        let amountValue = amount instanceof Money_1.Money ? amount.amount : amount;
        let fromCurrency = amount instanceof Money_1.Money ? amount.currency : from;
        let toCurrency = amount instanceof Money_1.Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            let calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money_1.Money) {
                return new Money_1.Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        let amountFrom = this.calculateToBase(new bignumber_js_1.BigNumber(1), fromCurrency);
        let amountTo = this.calculateToBase(new bignumber_js_1.BigNumber(1), toCurrency);
        let amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money_1.Money) {
            return new Money_1.Money(toCurrency, amountCalculated);
        }
        else {
            return amountCalculated;
        }
    }
    calculateToBase(amount, fromCurrency) {
        if (this.baseCurrency.code == fromCurrency.code) {
            return amount;
        }
        let er = this.getRate(fromCurrency);
        return er.rate.dividedBy(er.amount).times(amount);
    }
}
exports.CurrencyCalculator = CurrencyCalculator;
//# sourceMappingURL=CurrencyCalculator.js.map