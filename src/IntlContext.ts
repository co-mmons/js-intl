export abstract class IntlContext {
    abstract get locale(): string;
    abstract get locales(): string[];

    abstract get defaultNamespace(): string;

    private predefinedFormatOptions: any = {};

    private addPredefinedFormatOptions<T>(name: string, options: any) {
        this.predefinedFormatOptions[name] = options;
    }

    findPredefinedFormatOptions(name: string) {
        return this.predefinedFormatOptions[name];
    }

    /**
     * Path or url to a directory, where intl resources are stored.
     */
    resourcesLocation: string;

    public setResourcesLocation(location: string) {
        this.resourcesLocation = location;
    }

}
