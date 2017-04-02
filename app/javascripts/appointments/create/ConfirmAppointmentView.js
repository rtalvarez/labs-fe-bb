import BaseView from 'javascripts/shared/BaseView';
import ConfirmAppointmentViewTpl from 'templates/appointments/create/ConfirmAppointmentView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);
    }

    render() {
        const config = this.config;

        super.render(ConfirmAppointmentViewTpl, {
            appointment: config.appointmentModel.toJSON(),
            payment: config.paymentModel.toJSON()
        });
    }
}