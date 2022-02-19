export abstract class IntlContext {
    abstract get locale(): string;
    abstract get locales(): string[];

    abstract get defaultNamespace(): string;

    findPredefinedFormatOptions(name: string) {
        return undefined;
    }

    /**
     * Path or url to a directory, where intl resources are stored.
     */
    resourcesLocation: string;

    public setResourcesLocation(location: string) {
        this.resourcesLocation = location;
    }

}
