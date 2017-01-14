import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default (config = {}) => class extends Backbone.View.extend(config) {
    initialize() {
        this.$el = $(this.el);
        this.PubSub = PubSub;
        this.CONSTANTS = CONSTANTS;
        this._boundModelElements = [];
    }

    render(templateGen, data = {}) {
        this.$el.html(templateGen(data));
    }

    navigate(evt) {
        const path = $(evt.target)
            .closest('a')
            .attr('href');

        evt.preventDefault();
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.TO, path);
    }

    bindToModel(element, model, property) {
        element.on('input', _.debounce((evt) => {
            const newVal = $(evt.target).val();

            model.set(property, newVal);
            console.log('set new val', newVal, 'on', model);
        }, 400));

        this._boundModelElements.push(element);
    }

    unbindModels() {
        _.each(this._boundModelElements, (element) => {
           element.off('change');
        });
    }
}