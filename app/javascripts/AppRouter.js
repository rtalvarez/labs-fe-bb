import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default class AppRouter {
    constructor() {
        this.initializeRouter();
        this.registerRoutes();
    }

    initializeRouter() {
        const routerConfig = Backbone.Router.extend({
            routes: {
                'appointments/create': 'newAppointment'
            }
        });

        this._router = new routerConfig();
    }

    newAppointment() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT);
    }

    registerRoutes() {
        this._router.on('route:newAppointment', this.newAppointment.bind(this));

        Backbone.history.start();
    }
}

