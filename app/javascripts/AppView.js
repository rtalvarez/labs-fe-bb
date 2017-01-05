// import NavCtrl from './nav/nav.controller';
import BaseView from 'javascripts/shared/BaseView';
import AppTpl from 'templates/app';
// import AppTpl from 'templates/nav/nav';

export default class extends BaseView {
    initialize() {
        console.log('init app');

        this.render(AppTpl);
    }
}