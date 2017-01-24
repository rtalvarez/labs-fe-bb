import DependencyInjector from 'javascripts/utils/DependencyInjector';

export default (config) => class extends Backbone.Collection.extend(config) {
    initialize() {
        DependencyInjector.register(config, this);
    }
}