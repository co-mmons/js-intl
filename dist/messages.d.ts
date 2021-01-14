import { MessageRef } from "./MessageRef";
export declare function importMessages(url: string): Promise<unknown>;
export declare function setMessages(namespace: string, locale: string, messages: {
    [key: string]: string;
}): void;
/**
 * @deprecated Use {@link setMessages} instead.
 */
export declare function pushMessages(locale: string, namespace: string, messages: {
    [key: string]: string;
}): void;
export declare function insertMessagesVersion(versionName: string, priority: number, namespace: string, locale: string, messages: {
    [key: string]: string;
}): void;
export declare function deleteMessagesVersion(versionName: string): any;
export declare function deleteMessagesVersion(versionName: string, namespace: string): any;
export declare function findMessage(locales: string[], namespace: string, key: string): any;
export declare function isMessageNeedsFormatter(message: string): boolean;
export declare function extractMessageNamespaceAndKey(namespaceAndKey: string | MessageRef, defaultNamespace?: string): {
    namespace: string;
    key: string;
};
