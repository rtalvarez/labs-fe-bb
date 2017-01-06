import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import BaseView from 'javascripts/shared/BaseView';
import CONSTANTS from 'javascripts/shared/Constants';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import PubSub from 'javascripts/PubSub';
import NavView from 'javascripts/nav/NavView';

export default class extends BaseView() {
    initialize() {
        this.render(AppTpl);
        this.registerEvents();

        this.initViews();
        this.initRouter();
    }

    initRouter() {
        this.appRouter = new AppRouter();
    }
    
    initViews() {
        this.navView = new NavView({
            el: this.$el.find(CONSTANTS.SELECTORS.NAV_VIEW)
        });
    }

    onNewAppointmentNavigate() {
        this.createAppointmentView = new CreateAppointmentView({
            el: this.$el.find(CONSTANTS.SELECTORS.CREATE_APPOINTMENT_VIEW)
        });
    }

    registerEvents() {
        this.listenTo(PubSub, CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, this.onNewAppointmentNavigate);
    }
}