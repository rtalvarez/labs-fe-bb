import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default (config = {}) => class extends Backbone.View.extend(config) {
    initialize() {
        this.$el = $(this.el);
    }

    render(templateGen, data = {}) {
        this.$el.html(templateGen(data));
    }

    navigate(evt) {
        const path = $(evt.target)
            .closest('a')
            .attr('href');

        evt.preventDefault();
        console.log('triggering event in baseview', path);
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.TO, path);
    }
}