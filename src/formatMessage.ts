import IntlMessageFormat from "intl-messageformat";
import {IntlContext} from "./IntlContext";

export function formatMessage(message: string, values: {[key: string]: any}, formats?: any): string;

export function formatMessage(context: IntlContext, message: string, values: {[key: string]: any}, formats?: any): string

export function formatMessage(): string {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;

    const message: string = arguments[0 + knownContext];
    let values: any = arguments[1 + knownContext];
    let formats: any = arguments[2 + knownContext];

    return new IntlMessageFormat(message, context.locales, formats, {ignoreTag: true}).format(values) as string;
}
