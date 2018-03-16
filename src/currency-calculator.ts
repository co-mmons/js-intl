import {BigNumber} from "@co.mmons/js-utils/core";
import {Currency} from "./currency";
import {Money} from "./money";

export interface ExchangeRate {

    currency: Currency;

    amount: BigNumber;

    rate: BigNumber;

}

export class CurrencyCalculator {

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
	
	constructor(public readonly baseCurrency: Currency) {
    }
	
	protected rates: ExchangeRate[] = [];
	
	private getRate(currency: Currency): ExchangeRate {
        for (let r of this.rates) {
            if (r.currency.code == currency.code) {
                return r;
            }
        }
    }
	
	addRate(currency: Currency, amount: BigNumber, rate: BigNumber) {
        this.rates.push({currency: currency, amount: amount, rate: rate});
    }

    calculate(amount: BigNumber, from: Currency, to: Currency): BigNumber;

    calculate(money: Money, to: Currency): Money;

    calculate(amount: BigNumber | Money, from: Currency, to?: Currency): BigNumber | Money {

        let amountValue: BigNumber = amount instanceof Money ? amount.amount : amount;
        let fromCurrency: Currency = amount instanceof Money ? amount.currency : from;
        let toCurrency: Currency = amount instanceof Money ? from : to;

        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }

        if (this.baseCurrency.code == toCurrency.code) {
            let calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money) {
                return new Money(toCurrency, calculated);
            } else {
                return calculated;
            }
        }

        let amountFrom = this.calculateToBase(new BigNumber(1), fromCurrency);
        let amountTo = this.calculateToBase(new BigNumber(1), toCurrency);

        let amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money) {
            return new Money(toCurrency, amountCalculated);
        } else {
            return amountCalculated;
        }
    }

	protected calculateToBase(amount: BigNumber, fromCurrency: Currency): BigNumber {

        if (this.baseCurrency.code == fromCurrency.code) {
            return amount;
        }

        let er = this.getRate(fromCurrency);

        return er.rate.dividedBy(er.amount).times(amount);
    }

}
