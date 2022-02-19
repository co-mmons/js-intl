import { BigNumber } from "bignumber.js";
import { Currency } from "./Currency";
import { Money } from "./Money";
export function formatNumber(context, mode, value, predefinedOptionsOrOptions, additionalOptions) {
    const options = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? context.findPredefinedFormatOptions(`Intl.NumberFormat:${predefinedOptionsOrOptions}`) : predefinedOptionsOrOptions, additionalOptions);
    if (mode == "currency") {
        options.style = "currency";
    }
    else if (mode == "percent") {
        options.style = "percent";
    }
    else {
        options.style = "decimal";
    }
    if (value instanceof Money) {
        if (mode == "currency") {
            options.currency = value.currency.code;
        }
        value = value.amount.toNumber();
    }
    else if (value instanceof BigNumber) {
        value = value.toNumber();
    }
    else if (Array.isArray(value) && value) {
        if (mode == "currency") {
            if (value[0] instanceof Currency) {
                options.currency = value[0].code;
            }
            else if (value[0]) {
                options.currency = value[0];
            }
        }
        if (value[1] instanceof BigNumber) {
            value = value[1].toNumber();
        }
        else {
            value = value[1];
        }
    }
    return new Intl.NumberFormat(context.locales, options).format(value);
}
//# sourceMappingURL=formatNumber.js.map