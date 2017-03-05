import BaseModel from 'javascripts/shared/BaseModel';

export default class GoogleOAuth extends BaseModel() {
    initialize() {
        super.initialize();

        this.set('providerName', 'Google');
        gapi.load('client:auth2', () => this.initClient());
        this.attachEvents();
        window.g = this;
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.INITIATE.GOOGLE, (evtData) => this.signIn(evtData));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.TERMINATE.GOOGLE, () => this.signOut());
    }

    signIn(evtData = {}) {
        this.GoogleAuth.signIn()
            .then(() => {
                this.extractData(); // Might cause problems?
                this.createUser();

                if (evtData.returnRoute) {
                    this.PubSub.trigger(this.CONSTANTS.EVENTS.NAVIGATE.TO, evtData.returnRoute);
                }
            })
    }

    signOut() {
        this.GoogleAuth.signOut();
    }

    createUser() {
        const user = {
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            dateOfBirth: this.get('dateOfBirth'),
            email: this.get('email'),
            googleToken: this.get('idToken')
        };

        console.log('POSTING user');
        this.$post('/api/patients/create', user);
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
                this.GoogleAuth.isSignedIn.listen(() => this.updateSigninStatus());
                this.updateSigninStatus(this.GoogleAuth.isSignedIn.get());

                window.google = this.GoogleAuth;
            });
    }

    updateSigninStatus(isSignedIn) {
        this.set('isSignedIn', isSignedIn);

        if (isSignedIn) {
            this.extractData();
            this.fetchDateOfBirth();
            this.fetchUserId();
        }
    }

    fetchUserId() {
        this.$get('/api/patients/me', {
            googleToken: this.get('idToken'),
            email: this.get('email'),
        })
            .then(({ id }) => this.set('userId', id));
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

        this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE);
    }

    fetchDateOfBirth() {
        try {
            gapi.client.people.people.get({
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
    }
}
