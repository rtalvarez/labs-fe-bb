import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavView extends BaseView({
    events: {
        'click .schedule-appointment-action': 'onScheduleAppointmentClick',
        'click .do-login-action': 'onLoginClick',
        'click .visit-profile-action': 'onProfileLinkClick',
        'click .brand-logo': 'onBrandLogoClick',
        'click .visit-admin-portal-action': 'onAdminClick',
        'click .visit-home-action': 'onHomeActionClick',
        'click .contact-action': 'onContactActionClick',
    }
}) {
    initialize(config) {
        super.initialize(config);
        this.render(NavTpl);

        _.bindAll(this,
            'onLoginClick',
            'onProfileLinkClick',
            'onBrandLogoClick',
            'onAdminClick',
            'onHomeActionClick',
            'onContactActionClick',
            'onScheduleAppointmentClick');

        this._selectors = {
            admin: '.admin',
            profile: '.profile-item',
            createAppointment: '.create-appointment',
            menuButton: '.menu-button',
            contact: '.contact',
        };

        this.attachEvents();
        this.initSideNav();
    }

    initSideNav() {
        this.$find('menuButton').sideNav({
            closeOnClick: true,
            draggable: true,
        });
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, (googleClient) => this.onUserLogin(googleClient));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, (facebookClient) => this.onUserLogin(facebookClient));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.PROFILE, () => this.onProfileNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.CREATE_APPOINTMENTS, () => this.onCreateAppointmentNavigate());
    }

    onAdminClick(evt) {
        this.$find('admin').addClass(this.CONSTANTS.CLASSES.ACTIVE);
        this.navigate(evt);
    }

    onContactActionClick(evt) {
        this.$find('contact').addClass(this.CONSTANTS.CLASSES.ACTIVE);
        this.navigate(evt);
    }

    onHomeActionClick(evt) {
        this.$find('profile').removeClass(this.CONSTANTS.CLASSES.ACTIVE);
        this.navigate(evt);
    }

    onCreateAppointmentNavigate() {
        this.$find('createAppointment').addClass(this.CONSTANTS.CLASSES.ACTIVE);
    }

    onProfileNavigate() {
        this.$find('profile').addClass(this.CONSTANTS.CLASSES.ACTIVE);
    }

    onUserLogin(auth) {
        this.auth = auth;
        const data = this.getTemplateData();

        this.render(NavTpl, data);
        this.initSideNav();
    }

    getTemplateData() {
        const data = this.auth.getTemplateData();
        data.isLoggedIn = true;

        return data;
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
