import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel() {
    initialize(config) {
        super.initialize(config);

        this.attachEvents();

        if (window.FB) {
            this.onFacebookInit();
        }
    }

    attachEvents() {
        window.addEventListener('facebook-init', () => this.onFacebookInit());

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.INITIATE.FACEBOOK, (evtData) => this.login(evtData));
    }

    onFacebookInit() {
        console.log('init');
        this.FBAuth = window.FB;
        this.getLoginStatus();
    }

    onLoginStatusComplete(response) {
        console.log('r', response);
        this.fetchUserInfo();
    }

    getLoginStatus() {
        this.FBAuth.getLoginStatus((response) => this.onLoginStatusComplete(response));
    }

    login(evtData) {
        this._login()
            .then(response => this.onLoginStatusComplete(response));
    }

    logout() {
        return this.FBAuth.logout();
    }

    fetchUserInfo() {
        return this._fetchUserInfo()
            .then(response => this.setUserInfo(response));
    }

    setUserInfo(response) {
        console.log('user info', response);
        this.set({
            userName: response.name,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email,
            imageUrl: response.picture.data.url,
        });
    }

    _login() {
        const dfd = new $.Deferred();

        this.FBAuth.login(response => {
            if (response.status === 'connected') {
                dfd.resolve(response);
            } else {
                dfd.reject(response);
            }
        }, { scope: 'public_profile, email' });

        return dfd.promise();
    }

    _fetchUserInfo() {
        const dfd = new $.Deferred();

        this.FBAuth.api('/me?fields=name,first_name,last_name,email,picture', response => dfd.resolve(response));

        return dfd.promise();
    }
}
