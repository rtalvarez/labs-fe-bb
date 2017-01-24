import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';
import DependencyInjector from 'javascripts/utils/DependencyInjector';

export default (config = {}) => class extends Backbone.View.extend(config) {
    initialize() {
        DependencyInjector.register(config, this);
        this.$el = $(this.el);
        this.PubSub = PubSub;
        this.CONSTANTS = CONSTANTS;
        this._boundModelElements = [];
    }

    render(templateGen, data = {}, $el = this.$el) {
        $el.html(templateGen(data));
    }

    navigate(evt) {
        const path = $(evt.target)
            .closest('a')
            .attr('href');

        evt.preventDefault();
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.TO, path);
    }

    bindToModel(element, modelName, property, callback = _.noop) {
        element.on('input', _.debounce((evt) => {
            const newVal = $(evt.target).val();

            this[modelName].set(property, newVal);
            callback.call(this);
        }, 400));

        this._boundModelElements.push(element);
    }

    unbindModels() {
        _.each(this._boundModelElements, (element) => {
           element.off('change');
        });
    }
}