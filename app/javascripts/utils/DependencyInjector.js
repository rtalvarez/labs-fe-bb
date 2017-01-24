import Utils from 'javascripts/utils/Utils';

export default class {
    constructor() {
        this._utils = Utils;
    }

    get(dependencyName) {
        return this._utils[dependencyName];
    }

    static register(config, context) {
        _.each(config.dependencies, (dependencyName) => {
            context[dependencyName] = Utils[dependencyName];
        });
    }
}