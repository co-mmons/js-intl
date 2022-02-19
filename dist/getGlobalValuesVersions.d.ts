export declare function getGlobalValuesVersions(): {
    [namespace: string]: {
        name: string;
        messages: {
            [locale: string]: {
                [key: string]: any;
            };
        };
    }[];
};
