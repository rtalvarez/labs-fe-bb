import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';
import DependencyInjector from 'javascripts/utils/DependencyInjector';

export default (backboneConfig = {}) => class extends Backbone.View.extend(backboneConfig) {
    initialize(config) {
        DependencyInjector.register(backboneConfig, this);
        this.$el = $(this.el);
        this.PubSub = PubSub;
        this.CONSTANTS = CONSTANTS;
        this._boundModelElements = [];
        this.config = config;
    }

    scrollTo(selector, timer = 1000) {
        const $el = this.$find(selector);

        $('html, body').animate({ scrollTop: $el.height() }, timer);
    }

    /**
     * Function that properly de-bootstraps this view.
     * It removes all DOM events, custom events and removes itself from the DOM
     * It also kills all subviews and makes sure they also remove their events and
     * markup from the page
     * This is necessary in order to keep memory clean
     * This empty view will be kept in memory ready to be re-initialized by the parent
     * (if needed in the future)
     */
    destroy() {
        this.stopListening();
        this.$el.remove();
        this.destroyViews();
    }

    destroyViews() {
        console.log('destroying views', this.views);
        _.each(this.views, (view) => {
            view.stopListening();
            view.$el.empty();
        });

        delete this.views;
        this.views = {};
    }

    render(templateGen, data = {}, $el = this.$el) {
        $el.html(templateGen(data));
    }

    renderTemplate(templateGen, data) {
        return templateGen(data);
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
        this._navigate(path);
    }

    navigateToPath(path) {
        this._navigate(path);
    }

    _navigate(path) {
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