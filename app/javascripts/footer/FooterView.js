import BaseView from 'javascripts/shared/BaseView';
import FooterViewTpl from 'templates/footer/FooterView';

export default class extends BaseView({
    events: {
        'click .contact-action': 'navigateToAction',
        'click .home-action': 'navigateToAction',
        'click .appointment-action': 'navigateToAction',
        'click .about-action': 'navigateToAction',
        'click .profile-action': 'navigateToAction',
        'click .login-action': 'navigateToAction',
        'click .coming-soon-appointment-action': 'navigateToAction',
    }
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            'navigateToAction');

        this.render(FooterViewTpl);
        this.attachEvents();
    }

    navigateToAction(evt) {
        this.navigate(evt);
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, (googleClient) => this.onUserLogin(googleClient));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, (facebookClient) => this.onUserLogin(facebookClient));
    }

    onUserLogin(auth) {
        this.auth = auth;
        const data = this.getTemplateData();

        this.render(FooterViewTpl, data);
    }

    getTemplateData() {
        const data = this.auth.getTemplateData();
        data.isLoggedIn = true;

        return data;
    }
}
