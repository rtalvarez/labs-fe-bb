import BaseView from 'javascripts/shared/BaseView';
import ProfileViewTpl from 'templates/profile/ProfileView';

import ProfileDetailsView from 'javascripts/profile/ProfileDetailsView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            'profileDetails': '.profile-details-view'
        };

        this.preRender();
    }

    preRender() {
        if (this.config.authClient) {
            const templateData = this.getTemplateData();

            this.render(ProfileViewTpl, templateData);
            this.initViews();
        } else {
            this.navigateToPath('/');
        }
    }

    initViews() {
        this.views.details = new ProfileDetailsView({
            el: this.$find('profileDetails')
        });
    }

    getTemplateData() {
        const authClient = this.config.authClient;

        return {
            name: authClient.get('userName'),
            dateOfBirth: authClient.get('dateOfBirth'),
            email: authClient.get('email'),
            imageUrl: authClient.get('imageUrl')
        };
    }
}
