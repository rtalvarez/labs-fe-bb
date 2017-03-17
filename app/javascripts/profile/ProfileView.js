import BaseView from 'javascripts/shared/BaseView';
import ProfileViewTpl from 'templates/profile/ProfileView';

import ProfileDetailsView from 'javascripts/profile/ProfileDetailsView';
import BannerView from 'javascripts/shared/BannerView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            profileDetails: '.profile-details-view',
            missingDoBBanner: '.missing-dob-banner',
        };

        this._copy = {
            missingDoBBanner: 'Te recomendamos <strong>proveer tu fecha de nacimiento</strong> para agilizar la creacion de citas',
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

        this.views.missingDoBBanner = new BannerView({
            type: 'warning',
            msg: this._copy.missingDoBBanner,
            el: this.$find('missingDoBBanner'),
        });
    }

    getTemplateData() {
        const authClient = this.config.authClient;

        return {
            authProviderName: authClient.get('providerName'),
            name: authClient.get('userName'),
            dateOfBirth: authClient.get('dateOfBirth'),
            email: authClient.get('email'),
            imageUrl: authClient.get('imageUrl')
        };
    }
}
