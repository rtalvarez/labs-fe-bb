export default class GoogleOAuth {
    constructor() {
        gapi.load('client:auth2', () => this.initClient());
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
            })
    }

    updateSigninStatus(isSignedIn) {
        console.log(isSignedIn);
        this.isSignedIn = isSignedIn;

        if (isSignedIn) {
            this.extractData();
            this.fetchDateOfBirth();
        }
    }

    extractData() {
        this.GoogleUser = this.GoogleAuth.currentUser.get();
        this.GoogleUserProfile = this.GoogleUser.getBasicProfile();
        this.GoogleAuthResponse = this.GoogleUser.getAuthResponse();
    }


    getUserName() {
        return this.isSignedIn ? this.GoogleUserProfile.getName() : '';
    }

    getEmail() {
        return this.isSignedIn ? this.GoogleUserProfile.getEmail() : '';
    }

    getIdToken() {
        return this.isSignedIn ? this.GoogleAuthResponse.id_token : '';
    }

    getDateOfBirth() {
        return this.isSignedIn ? this.birthday : null;
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

        this.birthday = hasYear || _.first(birthdays);
        return this.birthday;
    }
}