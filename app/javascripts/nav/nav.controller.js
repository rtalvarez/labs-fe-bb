import NavTpl from 'templates/nav/nav';

export default class NavCtrl extends Backbone.View.extend({}) {
    initialize() {
        console.log('init 2', this);
        this.render();
    }

    render() {
        const html = NavTpl({
            trolls: 'dafuq'
        });

        this.$el.html(html);
    }
}