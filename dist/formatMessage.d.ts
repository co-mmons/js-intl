import { HtmlString } from "@co.mmons/js-utils/core";
import { IntlContext } from "./IntlContext";
export declare function formatMessage(message: HtmlString, values: {
    [key: string]: any;
}, formats?: any): HtmlString;
export declare function formatMessage(message: string, values: {
    [key: string]: any;
}, formats?: any): string;
export declare function formatMessage(context: IntlContext, message: string | HtmlString, values: {
    [key: string]: any;
}, formats?: any): string;
