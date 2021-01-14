import { MessageRef } from "./MessageRef";
export declare function importMessages(url: string): Promise<unknown>;
export declare function setMessages(locale: string, namespace: string, messages: {
    [key: string]: string;
}): void;
/**
 * @deprecated Use {@link setMessages} instead.
 */
export declare function pushMessages(locale: string, namespace: string, messages: {
    [key: string]: string;
}): void;
export declare function insertMessagesVersion(versionName: string, priority: number, locale: string, namespace: string, messages: {
    [key: string]: string;
}): void;
export declare function deleteMessagesVersion(versionName: string, locale: string, namespace: string): void;
export declare function findMessage(locales: string[], namespace: string, key: string): any;
export declare function isMessageNeedsFormatter(message: string): boolean;
export declare function extractMessageNamespaceAndKey(namespaceAndKey: string | MessageRef, defaultNamespace?: string): {
    namespace: string;
    key: string;
};
