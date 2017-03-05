import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import NavView from 'javascripts/nav/NavView';
import LoginView from 'javascripts/login/LoginView';
import ViewAppointmentView from 'javascripts/appointments/ViewAppointmentView';
import HomeView from 'javascripts/home/HomeView';
import ProfileView from 'javascripts/profile/ProfileView';

import GoogleOAuth from 'javascripts/utils/GoogleOAuth';
import FacebookOAuth from 'javascripts/utils/FacebookOAuth';

export default class extends BaseView() {
    initialize() {
        super.initialize();

        this.render(AppTpl);
        this.registerEvents();

        this._selectors = {
            createAppointmentView: '.create-appointment-view',
            navView: '.nav-view',
            loginView: '.login-view',
            viewAppointmentView: '.view-appointment-view',
            homeView: '.home-view',
            profileView: '.profile-view'
        };

        this.initAuth();
        this.initViews();
        this.initRouter();
    }

    initAuth() {
        this.googleAuth = new GoogleOAuth();
        this.facebookAuth = new FacebookOAuth();

        this._authClients = {
            facebook: this.facebookAuth,
            google: this.googleAuth,
        };
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
        this.views.createAppointmentView = new CreateAppointmentView({
            el: this.$find('createAppointmentView')
        });
    }

    onLoginNavigate() {
        this.views.loginView = new LoginView({
            el: this.$find('loginView'),
            googleAuth: this.googleAuth,
        });
    }

    onViewAppointmentNavigate(id) {
        this.views.viewAppointment = new ViewAppointmentView({
            el: this.$find('viewAppointmentView'),
            appointmentId: id
        });
    }

    onHomeNavigate() {
        this.views.homeView = new HomeView({
            el: this.$find('homeView'),
        });
    }

    onProfileNavigate() {
        this.views.profile = new ProfileView({
            el: this.$find('profileView'),
            authClient: this.activeAuth
        });
    }

    registerEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.TO, () => this.destroyViews());

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.HOME, () => this.onHomeNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.PROFILE, () => this.onProfileNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, () => this.onNewAppointmentNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.LOGIN, () => this.onLoginNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.VIEW_APPOINTMENT, (id) => this.onViewAppointmentNavigate(id));

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onAuthClientComplete('google'));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, () => this.onAuthClientComplete('facebook'));
    }

    onAuthClientComplete(authClientName) {
        this.activeAuth = this._authClients[authClientName];
        console.log('set auth client', this.activeAuth);
    }
}
