import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsViewTpl from 'templates/profile/ProfileDetailsView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';

export default class extends BaseView({
    collection: new AppointmentCollection(),
}) {
    initialize(config) {
        super.initialize(config);

        this.render(ProfileDetailsViewTpl);
        console.log('fetching');
        this.fetchAppointments();
    }

    fetchAppointments() {
        this.collection.fetchAppointments()
            .then(() => this.renderAppointmentsHistory());
    }

    renderAppointmentsHistory() {
        console.log('apps', this.collection.get());
    }
}