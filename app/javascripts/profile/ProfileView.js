import BaseView from 'javascripts/shared/BaseView';
import ProfileViewTpl from 'templates/profile/ProfileView';
import ProfileDetailsView from 'javascripts/profile/ProfileDetailsView';
import BannerView from 'javascripts/shared/BannerView';
import MissingDoBBannerContent from 'templates/profile/MissingDoBBannerContent';
import DatepickerView from 'javascripts/shared/DatepickerView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            profileDetails: '.profile-details-view',
            missingDoBBanner: '.missing-dob-banner',
            addDoB: '.add-dob-action',
            addDoBDatepicker: '.add-dob-datepicker',
            addDoBDatepickerWrapper: '.add-dob-datepicker-wrapper',
        };

        this.userModel = config.userModel;
        this.preRender();
    }

    attachEvents() {
        this.$find('addDoB').click((evt) => this.onAddDoBClick(evt));
        const datepickerId = this.CONSTANTS.DATEPICKER_IDS.ADD_DOB;

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.DATEPICKER.CLOSE(datepickerId), (data) => this._onDoBDatepickerSelect(data));
    }

    _onDoBDatepickerSelect(date) {
        console.log('d', date.obj.toJSON());
        this.userModel.setDoB(date.obj.toJSON());
        this.views.missingDoBBanner.hide();
    }

    onAddDoBClick(evt) {
        evt.preventDefault();
        this.$find('addDoBDatepickerWrapper').removeClass(this.CONSTANTS.CLASSES.HIDDEN);

        setTimeout(() => {
            this.views.dobDatepicker.open();
        });
    }

    preRender() {
        if (this.config.authClient) {
            const templateData = this.getTemplateData();

            this.render(ProfileViewTpl, templateData);
            this.initViews();
            this.attachEvents();
        } else {
            this.navigateToPath('/');
        }
    }

    initViews() {
        this.views.details = new ProfileDetailsView({
            el: this.$find('profileDetails')
        });

        if (!this.config.authClient.get('dateOfBirth')) {
            this.views.missingDoBBanner = new BannerView({
                type: 'warning',
                msg: MissingDoBBannerContent,
                el: this.$find('missingDoBBanner'),
            });

            this.views.dobDatepicker = new DatepickerView({
                el: this.$find('addDoBDatepicker'),
                id: this.CONSTANTS.DATEPICKER_IDS.ADD_DOB,
                datePickerConfig: {
                    max: new Date()
                }
            });
        }
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
