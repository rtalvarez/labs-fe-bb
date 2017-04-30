import BaseView from 'javascripts/shared/BaseView';
import HomeViewTpl from 'templates/home/HomeView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            parallax: '.parallax',
        };

        this.render(HomeViewTpl);
        this.initParallax();
    }

    initParallax() {
        this.$find('parallax').parallax();
    }
}
