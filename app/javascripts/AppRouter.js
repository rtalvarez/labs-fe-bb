import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default class AppRouter extends Backbone.Router.extend({
    routes: {
        'appointments/create': 'newAppointment',
        'login': 'login',
        'appointments/:id': 'viewAppointment'
    }
}) {
    initialize() {
        super.initialize();
        this.registerEvents();

        Backbone.history.start({ pushState: true });
    }

    navigateTo(path) {
        this.navigate(path, { trigger: true });
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
        console.log('Trigerin login navigate');
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.LOGIN);
    }
}

