import BaseView from 'javascripts/shared/BaseView';
import AppointmentDetailsViewTpl from 'templates/appointments/create/AppointmentDetailsView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);
    }

    getTemplateData() {
        const appointment = this.config.appointmentModel.toJSON();
        const data = {
            appointment,
        };

        return data;
    }

    render() {
        const data = this.getTemplateData();
        console.log('d', data);
        super.render(AppointmentDetailsViewTpl, data);
    }
}