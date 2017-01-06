import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';

export default class AppRouter extends Backbone.Router.extend({}) {
    constructor() {
        super();
    }

    initialize() {
        this.initializeRouter();
        this.registerRoutes();
        this.registerEvents();
    }

    initializeRouter() {
        this._routes = {
            'appointments/create': 'newAppointment'
        };

        const routerConfig = Backbone.Router.extend({
            routes: this._routes
        });

        this._router = new routerConfig();
    }

    navigateTo(path) {
        this._router.navigate(path, { trigger: true });
    }

    newAppointment() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT);
    }

    registerEvents() {
        this.listenTo(PubSub, CONSTANTS.EVENTS.NAVIGATE.TO, this.navigateTo.bind(this));
    }

    registerRoutes() {
        this._router.on('route:newAppointment', this.newAppointment.bind(this));

        Backbone.history.start({ pushState: true });
    }
}

