import { BigNumber } from "bignumber.js";
import { Currency } from "./currency";
import { Money } from "./money";
export class CurrencyCalculator {
    constructor(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    static main() {
        let converter = new CurrencyCalculator(new Currency("PLN"));
        converter.addRate(new Currency("EUR"), new BigNumber(1), new BigNumber(4));
        converter.addRate(new Currency("USD"), new BigNumber(1), new BigNumber(2));
        let eur1 = new Money(new Currency("EUR"), new BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new Currency("PLN")));
        let usd1 = new Money(new Currency("USD"), new BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new Currency("USD")));
        let pln1 = new Money(new Currency("PLN"), new BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new Currency("USD")));
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
        let amountValue = amount instanceof Money ? amount.amount : amount;
        let fromCurrency = amount instanceof Money ? amount.currency : from;
        let toCurrency = amount instanceof Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            let calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money) {
                return new Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        let amountFrom = this.calculateToBase(new BigNumber(1), fromCurrency);
        let amountTo = this.calculateToBase(new BigNumber(1), toCurrency);
        let amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money) {
            return new Money(toCurrency, amountCalculated);
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
//# sourceMappingURL=currency-calculator.js.map