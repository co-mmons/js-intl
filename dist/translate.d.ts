import { IntlContext } from "./IntlContext";
import { MessageRef } from "./MessageRef";
import { ValueKey } from "./ValueKey";
import { ValueRef } from "./ValueRef";
declare type KeyType = ValueKey | MessageRef | ValueRef;
export declare function translate(key: KeyType, values?: any, formats?: any): string;
export declare function translate(context: IntlContext, key: KeyType, values?: any, formats?: any): string;
export {};
