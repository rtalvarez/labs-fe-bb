import BaseView from 'javascripts/shared/BaseView';
import ConfirmAppointmentViewTpl from 'templates/appointments/create/ConfirmAppointmentView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this.render(ConfirmAppointmentViewTpl);
    }
}