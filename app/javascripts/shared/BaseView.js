export default class extends Backbone.View.extend({}) {
    render(templateGen, data) {
        this.$el.html(templateGen(data));
    }
}