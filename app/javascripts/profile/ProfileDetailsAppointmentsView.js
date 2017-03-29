import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsAppointmentsViewTpl from 'templates/profile/ProfileDetailsAppointmentsView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this.render(ProfileDetailsAppointmentsViewTpl, {
            appointments: this.collection.toJSON()
        });
    }
}