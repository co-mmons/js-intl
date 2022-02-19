import {BigNumber} from "bignumber.js";
import {DecimalFormatRef} from "./DecimalFormatRef";
import {defineGlobals} from "./defineGlobals";
import {formatNumber} from "./formatNumber";
import {IntlContext} from "./IntlContext";

defineGlobals();

type ValueType = number | BigNumber | DecimalFormatRef;
type PredefinedOptionsType = string | Intl.NumberFormatOptions;

export function formatDecimal(value: ValueType, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions);

export function formatDecimal(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsType, additionalOptions?: Intl.NumberFormatOptions);

export function formatDecimal() {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value: ValueType = arguments[0 + knownContext];
    const predefinedOptions: PredefinedOptionsType = arguments[1 + knownContext];
    const additionalOptions: Intl.NumberFormatOptions = arguments[2 + knownContext];


    if (value instanceof DecimalFormatRef) {
        return formatNumber(context, "decimal", value.value, value.predefined, value.options);
    }

    return formatNumber(context, "decimal", value, predefinedOptions, additionalOptions);
}
