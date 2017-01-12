import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default (config = {}) => class extends Backbone.View.extend(config) {
    initialize() {
        this.$el = $(this.el);
        this.PubSub = PubSub;
        this.CONSTANTS = CONSTANTS;
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
}