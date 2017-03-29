import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsViewTpl from 'templates/profile/ProfileDetailsView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';

import ProfileDetailsAppointmentsView from 'javascripts/profile/ProfileDetailsAppointmentsView';

export default class extends BaseView({
    collection: new AppointmentCollection(),
}) {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            appointments: '.profile-details-appointments-view',
        };

        this.render(ProfileDetailsViewTpl);
        console.log('fetching');
        this.fetchAppointments();
    }

    fetchAppointments() {
        this.collection.fetchAppointments()
            .then(() => this.renderAppointmentsHistory());
    }

    renderAppointmentsHistory() {
        this.views.appointmentList = new ProfileDetailsAppointmentsView({
            collection: this.collection,
            el: this.$find('appointments'),
        });
    }
}