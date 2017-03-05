import BaseView from 'javascripts/shared/BaseView';
import ProfileViewTpl from 'templates/profile/ProfileView';

import ProfileDetailsView from 'javascripts/profile/ProfileDetailsView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            'profileDetails': '.profile-details-view'
        };

        this._authClients = {
            google: config.googleAuth,
            facebook: config.facebookAuth,
        };

        this.attachEvents();
    }

    attachEvents() {
        console.log('attach auth events');
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onAuthClientComplete('google'));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.FACEBOOK, () => this.onAuthClientComplete('facebook'));
    }

    onAuthClientComplete(authClientName) {
        const templateData = this.getTemplateData(authClientName);
        console.log('t', templateData);

        this.render(ProfileViewTpl, templateData);
        this.initViews();
    }

    initViews() {
        this.views.details = new ProfileDetailsView({
            el: this.$find('profileDetails')
        });
    }

    getTemplateData(authClientName) {
        const authClient = this._authClients[authClientName];

        return {
            name: authClient.get('userName'),
            dateOfBirth: authClient.get('dateOfBirth'),
            email: authClient.get('email'),
            imageUrl: authClient.get('imageUrl')
        };
    }
}
