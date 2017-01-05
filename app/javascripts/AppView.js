import NavView from 'javascripts/nav/NavView';
import BaseView from 'javascripts/shared/BaseView';
import AppTpl from 'templates/AppView';
import CONSTANTS from 'javascripts/shared/Constants';
// import AppTpl from 'templates/nav/nav';

export default class extends BaseView {
    initialize() {
        console.log('init app');

        this.render(AppTpl);
        this.initViews();
    }
    
    initViews() {
        this.navView = new NavView({
            el: this.$el.find(CONSTANTS.SELECTORS.NAV_VIEW)
        });

        console.log('inited views')
    }
}