import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavCtrl extends BaseView {
    initialize() {
        console.log('init 2', this);
        this.render(NavTpl);
    }
}