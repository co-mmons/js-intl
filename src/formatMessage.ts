import {HtmlString} from "@co.mmons/js-utils/core";
import IntlMessageFormat from "intl-messageformat";
import {IntlContext} from "./IntlContext";

export function formatMessage(message: HtmlString, values: {[key: string]: any}, formats?: any): HtmlString;

export function formatMessage(message: string, values: {[key: string]: any}, formats?: any): string;

export function formatMessage(context: IntlContext, message: string | HtmlString, values: {[key: string]: any}, formats?: any): string

export function formatMessage(): string | HtmlString {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;

    const message = arguments[0 + knownContext];
    const html = message instanceof HtmlString;
    let values: any = arguments[1 + knownContext];
    let formats: any = arguments[2 + knownContext];

    const formatted = new IntlMessageFormat(message.toString(), context.locales, formats, {ignoreTag: true}).format(values) as string;

    if (html) {
        return new HtmlString(formatted);
    } else {
        return formatted;
    }
}
