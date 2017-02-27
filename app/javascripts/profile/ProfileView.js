import BaseView from 'javascripts/shared/BaseView';
import ProfileViewTpl from 'templates/profile/ProfileView';

import ProfileDetailsView from 'javascripts/profile/ProfileDetailsView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            'profileDetails': '.profile-details-view'
        };

        this.attachEvents();
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.AUTH.OK.GOOGLE, () => this.onAuthClientComplete());
    }

    onAuthClientComplete() {
        const templateData = this.getTemplateData();
        console.log('t', templateData);

        this.render(ProfileViewTpl, templateData);
        this.initViews();
    }

    initViews() {
        this.views.details = new ProfileDetailsView({
            el: this.$find('profileDetails')
        });
    }

    getTemplateData() {
        const googleAuth = this.config.googleAuth;

        return {
            name: googleAuth.get('userName'),
            dateOfBirth: googleAuth.get('dateOfBirth'),
            email: googleAuth.get('email'),
            imageUrl: googleAuth.get('imageUrl')
        };
    }
}