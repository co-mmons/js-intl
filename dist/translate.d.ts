import { IntlContext } from "./IntlContext";
import { MessageRef } from "./MessageRef";
import { ValueKey } from "./ValueKey";
import { ValueRef } from "./ValueRef";
declare type KeyType = ValueKey | MessageRef | ValueRef | [namespace: string, key: string];
interface TranslateOptions {
    formats?: any;
    defaultMessage?: "key" | "undefined" | ((namespace: string, key: string) => string);
}
export declare function translate(key: KeyType, values?: any, options?: TranslateOptions): string;
export declare function translate(context: IntlContext, key: KeyType, values?: any, options?: TranslateOptions): string;
export {};
