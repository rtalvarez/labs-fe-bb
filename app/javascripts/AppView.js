import AppTpl from 'templates/AppView';
import AppRouter from 'javascripts/AppRouter';
import AdminView from 'javascripts/admin/AdminView';
import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentView from 'javascripts/appointments/create/CreateAppointmentView';
import NavView from 'javascripts/nav/NavView';
import LoginView from 'javascripts/login/LoginView';
import ViewAppointmentView from 'javascripts/appointments/ViewAppointmentView';
import HomeView from 'javascripts/home/HomeView';
import ProfileView from 'javascripts/profile/ProfileView';
import ContactView from 'javascripts/contact/ContactView';
import FooterView from 'javascripts/footer/FooterView';
import ComingSoonAppointmentCreateView from 'javascripts/coming-soon/appointment-create/ComingSoonAppointmentCreateView';

import UserModel from 'javascripts/shared/UserModel';

import GoogleOAuth from 'javascripts/utils/GoogleOAuth';
import FacebookOAuth from 'javascripts/utils/FacebookOAuth';

export default class extends BaseView() {
    initialize() {
        super.initialize();

        this.render(AppTpl);
        this.registerEvents();

        this._selectors = {
            adminView: '.admin-view',
            createAppointmentView: '.create-appointment-view',
            navView: '.nav-view',
            loginView: '.login-view',
            viewAppointmentView: '.view-appointment-view',
            homeView: '.home-view',
            profileView: '.profile-view',
            contactView: '.contact-view',
            footerView: '.footer-view',
            comingSoonAppointmentCreateView: '.coming-soon-appointment-create-view',
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
            el: this.$find('navView'),
        });

        this.footerView = new FooterView({
            el: this.$find('footerView'),
        });
    }

    onNewAppointmentNavigate() {
        this.destroyViews();

        this.views.createAppointmentView = new CreateAppointmentView({
            el: this.$find('createAppointmentView'),
            auth: this.activeAuth,
        });
    }

    onLoginNavigate() {
        this.destroyViews();

        this.views.loginView = new LoginView({
            el: this.$find('loginView'),
            googleAuth: this.googleAuth,
        });
    }

    onViewAppointmentNavigate(id) {
        this.destroyViews();

        this.views.viewAppointment = new ViewAppointmentView({
            el: this.$find('viewAppointmentView'),
            appointmentId: id
        });
    }

    onHomeNavigate() {
        this.destroyViews();

        this.views.homeView = new HomeView({
            el: this.$find('homeView'),
        });
    }

    onProfileNavigate() {
        const userId = this.activeAuth && this.activeAuth.get('userId');

        if (!userId) {
            return this.navigateToPath('home');
        }

        this.destroyViews();

        this.views.profile = new ProfileView({
            el: this.$find('profileView'),
            authClient: this.activeAuth,
            userModel: new UserModel({
                userId,
            }),
        });
    }

    onAuthClientLogout(provider) {
        this.destroyViews();
        delete this.activeAuth;

        this.initAuth();
        this.initViews();
        this.navigateToPath('/home');
    }

    onAdminNavigate() {
        this.destroyViews();

        this.views.admin = new AdminView({
            el: this.$find('adminView'),
            authClient: this.activeAuth,
        });
    }

    onContactNavigate() {
        this.destroyViews();

        this.views.contact = new ContactView({
            el: this.$find('contactView'),
        });
    }

    onComingSoonAppointmentCreateNavigate() {
        this.destroyViews();

        this.views.comingSoonAppointmentCreateView = new ComingSoonAppointmentCreateView({
            el: this.$find('comingSoonAppointmentCreateView'),
        });
    }

    registerEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.TO, () => this.destroyViews());

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.COMING_SOON_APPOINTMENT_CREATE, () => this.onComingSoonAppointmentCreateNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.CONTACT, () => this.onContactNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.ADMIN, () => this.onAdminNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.HOME, () => this.onHomeNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.PROFILE, () => this.onProfileNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.NEW_APPOINTMENT, () => this.onNewAppointmentNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.LOGIN, () => this.onLoginNavigate());
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.NAVIGATE.VIEW_APPOINTMENT, (id) => this.onViewAppointmentNavigate(id));

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onAuthClientComplete('google'));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, () => this.onAuthClientComplete('facebook'));

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.TERMINATE.GOOGLE, () => this.onAuthClientLogout('google'));
    }

    onAuthClientComplete(authClientName) {
        this.activeAuth = this._authClients[authClientName];
        console.log('set auth client', this.activeAuth);
    }
}
