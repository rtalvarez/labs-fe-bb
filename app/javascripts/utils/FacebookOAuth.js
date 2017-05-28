import BaseOAuth from 'javascripts/utils/BaseOAuth';

export default class extends BaseOAuth {
    initialize(config) {
        super.initialize(config);

        this.attachEvents();

        this.set('providerName', 'Facebook');
        if (window.FB) {
            this.onFacebookInit();
        }
    }

    attachEvents() {
        window.addEventListener('facebook-init', () => this.onFacebookInit());

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.INITIATE.FACEBOOK, (evtData) => this.login(evtData));
    }

    createUser() {
        const user = {
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            dateOfBirth: this.get('dateOfBirth'),
            email: this.get('email'),
            facebookUserId: this.get('facebookUserId'),
        };

        return this._postUser(user);
    }

    onFacebookInit() {
        console.log('init');

        this.FBAuth = window.FB;
        this.getLoginStatus()
            .then(() => this.fetchUserInfo())
            .then(() => this.fetchUserId())
            .then(id => this.onFetchedUserId(id))
            .then(() => {
                console.log('trigger auth event');
                this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, this);
            })
    }

    fetchUserId() {
        const data = {
            provider: 'facebook',
            facebookToken: this.get('idToken'),
            email: this.get('email'),
            facebookUserId: this.get('facebookUserId'),
        };

        return super.fetchUserId(data);
    }

    getLoginStatus() {
        const dfd = $.Deferred();

        this.FBAuth.getLoginStatus(response => {
            console.log('r', response);
            if (response.status === 'connected') {
                dfd.resolve(response);
            } else {
                dfd.reject(response);
            }
        });

        return dfd.promise();
    }

    login(evtData) {
        this._login()
            .then(() => this.fetchUserInfo())
            .then(() => this.fetchUserId())
            .then(id => this.onFetchedUserId(id))
            .then(() => {
                console.log('trigger auth event');
                this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, this);

                if (evtData.returnRoute) {
                    this.PubSub.trigger(this.CONSTANTS.EVENTS.NAVIGATE.TO, evtData.returnRoute);
                }
            });
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
            facebookUserId: response.id,
            idToken: this.FBAuth.getAccessToken(),
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
