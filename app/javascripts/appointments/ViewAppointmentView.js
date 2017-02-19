import BaseView from 'javascripts/shared/BaseView';

import ViewAppointmentViewTpl from 'templates/appointments/ViewAppointmentView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this.render(ViewAppointmentViewTpl);
        console.log('app id', config.appointmentId)
    }
}