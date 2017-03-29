import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsViewTpl from 'templates/profile/ProfileDetailsView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';

export default class extends BaseView({
    collection: new AppointmentCollection(),
}) {
    initialize(config) {
        super.initialize(config);

        this.render(ProfileDetailsViewTpl);
    }
}