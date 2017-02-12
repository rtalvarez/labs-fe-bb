import BaseView from 'javascripts/shared/BaseView';

import BannerViewTpl from 'templates/shared/BannerView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            banner: '.banner'
        };

        this.render(BannerViewTpl, config);
    }

    hide() {
        this.$find('banner').addClass(this.CONSTANTS.CLASSES.HIDDEN);
    }

    show() {
        this.$find('banner').removeClass(this.CONSTANTS.CLASSES.HIDDEN);
    }

    toggle() {
        this.$find('banner').toggleClass(this.CONSTANTS.CLASSES.HIDDEN);
    }
}