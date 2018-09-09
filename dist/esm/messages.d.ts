import { MessageRef } from ".";
export declare function importMessages(locale: string, namespace: string, messages: {
    [key: string]: string;
}): void;
export declare function findMessage(locales: string[], namespace: string, key: string): any;
export declare function isMessageNeedsFormatter(message: string): boolean;
export declare function extractMessageNamespaceAndKey(namespaceAndKey: string | MessageRef, defaultNamespace?: string): {
    namespace: string;
    key: string;
};
