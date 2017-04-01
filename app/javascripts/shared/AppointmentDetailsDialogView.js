import DialogView from 'javascripts/shared/DialogView';
import AppointmentDetailsDialogViewTpl from 'templates/shared/AppointmentDetailsDialogView';

export default class extends DialogView {
    initialize(config) {
        super.initialize(config);

        const appointment = this.model.toJSON();
        appointment.displayStudies = _.map(appointment.studies, study => study.name).join(',');
        debugger;
        const tplBody = this.renderTemplate(AppointmentDetailsDialogViewTpl, {
            appointment,
        });

        this.reRender({
            header: 'Detalles de la cita',
            body: tplBody,
            hasFooter: true,
        });
    }
}