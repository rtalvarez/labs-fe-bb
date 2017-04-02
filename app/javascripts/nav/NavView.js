import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavView extends BaseView({
    events: {
        'click .schedule-appointment-action': 'onScheduleAppointmentClick',
        'click .do-login-action': 'onLoginClick',
        'click .visit-profile-action': 'onProfileLinkClick',
        'click .brand-logo': 'onBrandLogoClick',
    }
}) {
    initialize(config) {
        super.initialize(config);
        this.render(NavTpl);

        _.bindAll(this,
            'onLoginClick',
            'onProfileLinkClick',
            'onBrandLogoClick',
            'onScheduleAppointmentClick');

        this._selectors = {
            profile: '.profile-item',
            createAppointment: '.create-appointment',
        };

        this.attachEvents();
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onUserLogin());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, () => this.onUserLogin());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.PROFILE, () => this.onProfileNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.CREATE_APPOINTMENTS, () => this.onCreateAppointmentNavigate());
    }

    onCreateAppointmentNavigate() {
        this.$find('createAppointment').addClass(this.CONSTANTS.CLASSES.ACTIVE);
    }

    onProfileNavigate() {
        this.$find('profile').addClass(this.CONSTANTS.CLASSES.ACTIVE);
    }

    onUserLogin() {
        this.render(NavTpl, {
            isLoggedIn: true
        }) ;
    }

    onBrandLogoClick(evt) {
        this.navigate(evt);
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
