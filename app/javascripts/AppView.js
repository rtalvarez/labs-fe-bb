import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import NavView from 'javascripts/nav/NavView';

export default class extends BaseView() {
    initialize() {
        super.initialize();
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
            el: this.$el.find(this.CONSTANTS.SELECTORS.NAV_VIEW)
        });
    }

    onNewAppointmentNavigate() {
        this.createAppointmentView = new CreateAppointmentView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.CREATE_APPOINTMENT_VIEW)
        });
    }

    registerEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, () => this.onNewAppointmentNavigate());
    }
}