import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavView extends BaseView({
    events: {
        'click .schedule-appointment-action': 'onScheduleAppointmentClick',
        'click .do-login-action': 'onLoginClick',
        'click .visit-profile-action': 'onProfileLinkClick'
    }
}) {
    initialize(config) {
        super.initialize(config);
        this.render(NavTpl);

        _.bindAll(this,
            'onLoginClick',
            'onProfileLinkClick',
            'onScheduleAppointmentClick');

        this.attachEvents();
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onUserLogin());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, () => this.onUserLogin());
    }

    onUserLogin() {
        this.render(NavTpl, {
            isLoggedIn: true
        }) ;
    }

    onScheduleAppointmentClick(evt) {
        this.navigate(evt);
    }

    onLoginClick(evt) {
        this.navigate(evt);
    }

    onProfileLinkClick(evt) {
        this.navigate(evt);
    }
}
