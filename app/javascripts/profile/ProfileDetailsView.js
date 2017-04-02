import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsViewTpl from 'templates/profile/ProfileDetailsView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';

import ProfileDetailsAppointmentsView from 'javascripts/profile/ProfileDetailsAppointmentsView';

export default class extends BaseView({
    collection: new AppointmentCollection(),
    events: {
        'click .new-appointment-action': '_onNewAppointmentActionClick',
        'click .logout-action': '_onLogoutActionClick',
    }
}) {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            appointments: '.profile-details-appointments-view',
        };

        this.render(ProfileDetailsViewTpl);
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

    _onNewAppointmentActionClick(event) {
        event.preventDefault();

        this.navigateToPath('/appointments/create');
    }

    _onLogoutActionClick(event) {
        event.preventDefault();

        this.PubSub.trigger(this.CONSTANTS.EVENTS.AUTH.LOGOUT);
    }
}