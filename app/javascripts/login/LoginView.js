import BaseView from 'javascripts/shared/BaseView';
import LoginViewTpl from 'templates/login/LoginView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this.render(LoginViewTpl);
    }
}