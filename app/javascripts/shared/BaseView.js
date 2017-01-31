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

    getModel() {
        return this.model;
    }

    $find(selector) {
        if (!selector || !this._selectors[selector]) {
            throw new TypeError(`Invalid selector key: ${selector} or value ${this._selectors[selector]}`);
        }

        return this.$el.find(this._selectors[selector]);
    }

    navigate(evt) {
        const path = $(evt.target)
            .closest('a')
            .attr('href');

        evt.preventDefault();
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.TO, path);
    }

    /**
     * Binds the value of a local element's input to a model's property
     * @param element The element reference that holds the value to bind, or a selector string to it
     * @param modelName The name of the model scoped inside `this`
     * @param property The property inside the model to bind the input's value to
     * @param callback An optional callback to execute when the value changes
     */
    bindToModel(element, modelName, property, callback = _.noop) {
        let $el = element;

        if (typeof element === 'string') {
            $el = this.$find(element);
        }

        $el.on('input', _.debounce((evt) => {
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