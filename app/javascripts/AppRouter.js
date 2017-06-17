import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default class AppRouter extends Backbone.Router.extend({
    routes: {
        'coming-soon/appointment-create': 'comingSoonAppointmentCreate',
        'appointments/create': 'newAppointment',
        // 'appointments/:id': 'viewAppointment',
        login: 'login',
        home: 'home',
        profile: 'profile',
        admin: 'admin',
        contact: 'contact',
        '*path': 'home',
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

    comingSoonAppointmentCreate() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.COMING_SOON_APPOINTMENT_CREATE);
    }

    contact() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.CONTACT);
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

