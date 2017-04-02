import BaseOAuth from 'javascripts/utils/BaseOAuth';

export default class GoogleOAuth extends BaseOAuth {
    initialize(config) {
        super.initialize(config);

        this.set('providerName', 'Google');
        gapi.load('client:auth2', () => this.initClient());
        this.attachEvents();
        window.g = this;
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.INITIATE.GOOGLE, (evtData) => this.signIn(evtData));
    }

    signIn(evtData = {}) {
        this.returnRoute = evtData.returnRoute;
        this.GoogleAuth.signIn();
    }

    signOut() {
        this.GoogleAuth.signOut();
        this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.TERMINATE.GOOGLE);
    }

    createUser() {
        const user = {
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            dateOfBirth: this.get('dateOfBirth'),
            email: this.get('email'),
            googleToken: this.get('idToken')
        };

        return this._postUser(user);
    }

    initClient() {
        gapi.client.init({
            clientId: '1093991722255-jnr8inga8rlkvdtih68e3jbe791fqh5a.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/user.birthday.read',
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1']
        })
            .then(() => {
                this.GoogleAuth = gapi.auth2.getAuthInstance();

                // Listen for sign-in state changes.
                this.GoogleAuth.isSignedIn.listen((isSignedIn) => this.updateSigninStatus(isSignedIn));
                this.updateSigninStatus(this.GoogleAuth.isSignedIn.get());

                window.google = this.GoogleAuth;
            });
    }

    updateSigninStatus(isSignedIn) {
        this.set('isSignedIn', isSignedIn);

        if (isSignedIn) {
            this.processSignedInUser();
        }
    }

    processSignedInUser() {
        this.extractData();
        this.fetchDateOfBirth()
            .then(() => this.fetchUserId())
            .then(userId => this.onFetchedUserId(userId))
            .then(() => {
                this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, this);

                if (this.returnRoute) {
                    this.PubSub.trigger(this.CONSTANTS.EVENTS.NAVIGATE.TO, this.returnRoute);
                }
            })
            .then(() => {
                this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.LOGOUT, () => this.signOut());
            });
    }

    fetchUserId() {
        const data = {
            provider: 'google',
            googleToken: this.get('idToken'),
            email: this.get('email'),
        };

        return super.fetchUserId(data);
    }

    extractData() {
        this.GoogleUser = this.GoogleAuth.currentUser.get();
        this.GoogleUserProfile = this.GoogleUser.getBasicProfile();
        this.GoogleAuthResponse = this.GoogleUser.getAuthResponse();

        this.set({
            userName: this.GoogleUserProfile.getName(),
            email: this.GoogleUserProfile.getEmail(),
            idToken: this.GoogleAuthResponse.id_token,
            imageUrl: this.GoogleUserProfile.getImageUrl(),
            firstName: this.GoogleUserProfile.getGivenName(),
            lastName: this.GoogleUserProfile.getFamilyName(),
        });
    }

    fetchDateOfBirth() {
        try {
            return gapi.client.people.people.get({
                resourceName: 'people/me'
            })
                .then((resp) => this.setDateOfBirth(resp));
        } catch (e) {
            console.log('GapiClientError:', e);
        }
    }

    setDateOfBirth(resp) {
        const birthdays = resp.result.birthdays;
        const hasYear = _.filter(birthdays, birthday => birthday.date.year);
        const birthday = hasYear.length ? _.first(hasYear).date : _.first(birthdays).date;
        const date = new Date(birthday.year, birthday.month - 1, birthday.day);

        this.set('dateOfBirth', date);

        return date;
    }
}
