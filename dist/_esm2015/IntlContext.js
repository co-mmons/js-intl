export class IntlContext {
    constructor() {
        this.predefinedFormatOptions = {};
    }
    addPredefinedFormatOptions(name, options) {
        this.predefinedFormatOptions[name] = options;
    }
    findPredefinedFormatOptions(name) {
        return this.predefinedFormatOptions[name];
    }
    setResourcesLocation(location) {
        this.resourcesLocation = location;
    }
}
//# sourceMappingURL=IntlContext.js.map