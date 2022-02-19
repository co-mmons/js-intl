import { BigNumber } from "bignumber.js";
import { CurrencyAndNumber } from "./CurrencyAndNumber";
import { IntlContext } from "./IntlContext";
import { Money } from "./Money";
export declare type NumberFormatType = "currency" | "percent" | "decimal";
export declare function formatNumber(context: IntlContext, mode: NumberFormatType, value: number | Money | BigNumber | CurrencyAndNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string;
