import BaseView from 'javascripts/shared/BaseView';
import LoginViewTpl from 'templates/login/LoginView';

export default class extends BaseView({
    events: {
        'click .google-login': 'onGoogleLoginClick'
    }
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            'onGoogleLoginClick');

        this.render(LoginViewTpl);
    }

    onGoogleLoginClick(evt) {
        evt.preventDefault();

        this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.INITIATE.GOOGLE, {
            returnRoute: 'profile'
        });
    }
}