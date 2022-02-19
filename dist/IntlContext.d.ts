export declare abstract class IntlContext {
    abstract get locale(): string;
    abstract get locales(): string[];
    abstract get defaultNamespace(): string;
    findPredefinedFormatOptions(name: string): any;
    /**
     * Path or url to a directory, where intl resources are stored.
     */
    resourcesLocation: string;
    setResourcesLocation(location: string): void;
}
