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
            'appointments/create': 'newAppointment',
            'login': 'login'
        };

        const routerConfig = Backbone.Router.extend({
            routes: this._routes
        });

        this._router = new routerConfig();
    }

    navigateTo(path) {
        console.log('Navigating to:', path);
        this._router.navigate(path, { trigger: true });
    }

    newAppointment() {
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT);
    }

    registerEvents() {
        this.listenTo(PubSub, CONSTANTS.EVENTS.NAVIGATE.TO, this.navigateTo.bind(this));
    }

    login() {
        console.log('Trigerin login navigate');
        PubSub.trigger(CONSTANTS.EVENTS.NAVIGATE.LOGIN);
    }

    registerRoutes() {
        console.log('Register router routes');
        this._router.on('route:newAppointment', () => this.newAppointment());
        this._router.on('route:login', () => this.login());

        Backbone.history.start({ pushState: true });
    }
}

