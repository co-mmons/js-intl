import {BigNumber} from "bignumber.js";
import {Currency} from "./Currency";
import {CurrencyAndNumber} from "./CurrencyAndNumber";
import {IntlContext} from "./IntlContext";
import {Money} from "./Money";

export type NumberFormatType = "currency" | "percent" | "decimal";

export function formatNumber(context: IntlContext, mode: NumberFormatType, value: number | Money | BigNumber | CurrencyAndNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string {

    const options: Intl.NumberFormatOptions = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? context.findPredefinedFormatOptions(predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);

    if (mode == "currency") {
        options.style = "currency";
    } else if (mode == "percent") {
        options.style = "percent";
    } else {
        options.style = "decimal";
    }

    if (value instanceof Money) {

        if (mode == "currency") {
            options.currency = value.currency.code;
        }

        value = value.amount.toNumber();

    } else if (value instanceof BigNumber) {
        value = value.toNumber();

    } else if (Array.isArray(value) && <CurrencyAndNumber>value) {

        if (mode == "currency") {

            if (value[0] instanceof Currency) {
                options.currency = (<Currency>value[0]).code;

            } else if (value[0]) {
                options.currency = <string>value[0];
            }
        }

        if (value[1] instanceof BigNumber) {
            value = (<BigNumber>value[1]).toNumber();
        } else {
            value = <number>value[1];
        }
    }

    return new Intl.NumberFormat(context.locales, options).format(value as number);
}
