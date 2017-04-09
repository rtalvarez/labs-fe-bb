import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default class AppRouter extends Backbone.Router.extend({
    routes: {
        'appointments/:id': 'viewAppointment',
        'appointments/create': 'newAppointment',
        login: 'login',
        home: 'home',
        profile: 'profile',
        admin: 'admin'
    }
}) {
    initialize() {
        super.initialize();
        this.registerEvents();

        Backbone.history.start({ pushState: true });
        window.c = this;
    }

    navigateTo(path) {
        console.log('navigateTo', path)
        this.navigate(path, { trigger: true });
    }

    admin() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.ADMIN);
    }

    home() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.HOME);
    }

    profile() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.PROFILE);
    }

    newAppointment() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT);
    }

    viewAppointment(id) {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.VIEW_APPOINTMENT, id);
    }

    registerEvents() {
        this.listenTo(PubSub, CONSTANTS.EVENTS.NAVIGATE.TO, this.navigateTo.bind(this));
    }

    login() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.LOGIN);
    }
}

