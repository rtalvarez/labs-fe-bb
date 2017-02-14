import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import NavView from 'javascripts/nav/NavView';
import LoginView from 'javascripts/login/LoginView';

export default class extends BaseView() {
    initialize() {
        super.initialize();
        console.log('Set views hash');

        this.render(AppTpl);
        this.registerEvents();

        this._selectors = {
            createAppointmentView: '.create-appointment-view',
            navView: '.nav-view',
            loginView: '.login-view'
        };
        this.views = {};
        this._views = {};


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
    }

    onNewAppointmentNavigate() {
        this.destroy();

        this.views.createAppointmentView = new CreateAppointmentView({
            el: this.$find('createAppointmentView')
        });
    }

    onLoginNavigate() {

        // TODO: Destroy other views
        this.views.loginView = new LoginView({
            el: this.$find('loginView')
        });
    }

    registerEvents() {
        console.log('Reg events');
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, () => this.onNewAppointmentNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.LOGIN, () => this.onLoginNavigate());
    }
}