import {BigNumber} from "bignumber.js";
import {Currency} from "./Currency";

export type CurrencyAndNumber = [currency: string | Currency, amount: number | BigNumber];
