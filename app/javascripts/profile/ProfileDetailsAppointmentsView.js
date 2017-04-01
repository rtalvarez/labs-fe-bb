import BaseView from 'javascripts/shared/BaseView';
import ProfileDetailsAppointmentsViewTpl from 'templates/profile/ProfileDetailsAppointmentsView';

import AppointmentDetailsDialogView from 'javascripts/shared/AppointmentDetailsDialogView';

export default class extends BaseView({
    events: {
        'click .see-details-action': '_openDetailsDialog'
    }
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            '_openDetailsDialog');

        this._selectors = {
            appointmentDetailsDialog: '#appointment-details-dialog',
        };

        this.render(ProfileDetailsAppointmentsViewTpl, {
            appointments: this.collection.toJSON()
        });
    }

    _openDetailsDialog(evt) {
        evt.preventDefault();
        const id = $(evt.target).data('id');
        const appointment = this.collection.findWhere({ id });
        console.log('click', id);

        if (this.views.detailsDialog) {
            this.destroyView('detailsDialog');
        }

        this.views.detailsDialog =  new AppointmentDetailsDialogView({
            el: this.$find('appointmentDetailsDialog'),
            dismissible: true,
            model: appointment,
        });

        this.views.detailsDialog.open();
    }
}