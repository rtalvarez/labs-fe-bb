import BaseView from 'javascripts/shared/BaseView';

import BannerViewTpl from 'templates/shared/BannerView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            banner: '.banner',
            bannerMessage: '.banner-message'
        };

        this.render(BannerViewTpl, config);

        if (config.hidden) {
            this.hide();
        }
    }

    scrollTo(timer = 1000) {
        const $el = this.$find('bannerMessage');

        $('html, body').animate({ scrollTop: $el.height() }, timer);
    }

    message(msg) {
        this.$find('bannerMessage').text(msg);
        this.show();

        return this;
    }

    hide() {
        this.$find('banner').addClass(this.CONSTANTS.CLASSES.HIDDEN);

        return this;
    }

    show() {
        this.$find('banner').removeClass(this.CONSTANTS.CLASSES.HIDDEN);

        return this;
    }

    toggle() {
        this.$find('banner').toggleClass(this.CONSTANTS.CLASSES.HIDDEN);

        return this;
    }
}