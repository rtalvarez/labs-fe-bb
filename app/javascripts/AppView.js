import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import NavView from 'javascripts/nav/NavView';
import LoginView from 'javascripts/login/LoginView';
import ViewAppointmentView from 'javascripts/appointments/ViewAppointmentView';

import GoogleOAuth from 'javascripts/utils/GoogleOAuth';

export default class extends BaseView() {
    initialize() {
        super.initialize();
        this.views = {};

        this.render(AppTpl);
        this.registerEvents();

        this._selectors = {
            createAppointmentView: '.create-appointment-view',
            navView: '.nav-view',
            loginView: '.login-view',
            viewAppointmentView: '.view-appointment-view'
        };

        this.initViews();
        this.initRouter();
    }

    initRouter() {
        this.appRouter = new AppRouter();
    }
    
    initViews() {
        this.navView = new NavView({
            el: this.$find('navView')
        });

        this.googleAuth = new GoogleOAuth();
    }

    onNewAppointmentNavigate() {
        this.views.createAppointmentView = new CreateAppointmentView({
            el: this.$find('createAppointmentView')
        });
    }

    onLoginNavigate() {
        this.views.loginView = new LoginView({
            el: this.$find('loginView')
        });
    }

    onViewAppointmentNavigate(id) {
        this.views.viewAppointment = new ViewAppointmentView({
            el: this.$find('viewAppointmentView'),
            appointmentId: id
        });
    }

    registerEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.TO, () => this.destroyViews());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, () => this.onNewAppointmentNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.LOGIN, () => this.onLoginNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.VIEW_APPOINTMENT, (id) => this.onViewAppointmentNavigate(id));
    }
}