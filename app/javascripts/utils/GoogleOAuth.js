import BaseModel from 'javascripts/shared/BaseModel';

export default class GoogleOAuth extends BaseModel() {
    initialize() {
        super.initialize();

        gapi.load('client:auth2', () => this.initClient());
        this.attachEvents();
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.INITIATE.GOOGLE, (evtData) => this.signIn(evtData));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.TERMINATE.GOOGLE, () => this.signOut());
    }

    signIn(evtData = {}) {
        this.GoogleAuth.signIn()
            .then(() => {
                if (evtData.returnRoute) {
                    console.log('success login', evtData.returnRoute);
                    this.PubSub.trigger(this.CONSTANTS.EVENTS.NAVIGATE.TO, evtData.returnRoute);
                }
            })
    }

    signOut() {
        this.GoogleAuth.signOut();
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
                window.google = this.GoogleAuth;
            });
    }

    updateSigninStatus(isSignedIn) {
        console.log(isSignedIn);
        this.set('isSignedIn', isSignedIn);

        if (isSignedIn) {
            this.extractData();
            this.fetchDateOfBirth();
        }
    }

    extractData() {
        this.GoogleUser = this.GoogleAuth.currentUser.get();
        this.GoogleUserProfile = this.GoogleUser.getBasicProfile();
        this.GoogleAuthResponse = this.GoogleUser.getAuthResponse();

        this.set('userName', this.GoogleUserProfile.getName());
        this.set('email', this.GoogleUserProfile.getEmail());
        this.set('idToken', this.GoogleAuthResponse.id_token);
    }

    fetchDateOfBirth() {
        try {
            gapi.client.people.people({
                resourceName: 'people/me'
            })
                .then((resp) => this.setDateOfBirth(resp));
        } catch (e) {
            console.log('GapiClientError:', e);
        }
    }

    setDateOfBirth(resp) {
        const birthdays = resp.result.birthdays;
        const hasYear = _.findWhere(birthdays, (birthday) => birthday.date.year);

        this.set('dateOfBirth', hasYear || _.first(birthdays));
    }
}