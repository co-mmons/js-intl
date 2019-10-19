import { IntlBundleItem } from "./bundle-generator";
import { MessageRef } from "./message-ref";
export declare const localeIntlBundleItem: IntlBundleItem;
/**
 * https://en.wikipedia.org/wiki/IETF-language-tag
 */
export declare class Locale {
    private static _codes;
    private static _languages;
    constructor(code: string);
    private $constructor;
    readonly code: string;
    readonly name: MessageRef;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
