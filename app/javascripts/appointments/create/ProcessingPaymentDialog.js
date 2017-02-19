import DialogView from 'javascripts/shared/DialogView';

import ProcessingPaymentDialogBodyTpl from 'templates/appointments/create/ProcessingPaymentDialogBody';
import ErrorPaymentDialogBodyTpl from 'templates/appointments/create/ErrorPaymentDialogBody';
import AppointmentCreatedDialogBodyTpl from 'templates/appointments/create/AppointmentCreatedDialogBody';
import AppointmentNotCreatedDialogBodyTpl from 'templates/appointments/create/AppointmentNotCreatedDialogBody';

export default class extends DialogView {
    initialize(config) {
        _.bindAll(this,
            'paymentError');

        this._copy = {
            processing: {
                header: 'Un segundo, por favor ..',
                body: ProcessingPaymentDialogBodyTpl
            }
        };

        config.header = this._copy.processing.header;
        config.body = this._copy.processing.body;

        super.initialize(config);

        this.attachEvents();
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_ERROR, this.paymentError);
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.APPOINTMENT_CREATED, this.appointmentCreated);
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.APPOINTMENT_NOT_CREATED, this.appointmentNotCreated);
        this.on(this.CONSTANTS.EVENTS.DIALOG.CLOSED, this._onProcessingPaymentDialogClose);
    }

    _onProcessingPaymentDialogClose() {
        if (this._success) {
            console.log('success as d');
            this.navigateToPath(this.CONSTANTS.URLS.LOGIN);
        } else {
            console.log('no success');
        }
    }

    appointmentNotCreated() {
        this.reRender({
            header: 'Error al crear la cita',
            body: AppointmentNotCreatedDialogBodyTpl,
            hasFooter: true,
        })
    }

    appointmentCreated() {
        this.reRender({
            header: 'Todo listo!',
            body: AppointmentCreatedDialogBodyTpl,
            hasFooter: true,
        });

        this._success = true;
    }

    paymentError(conektaResponse, paymentModel) {
        console.log('pego en paymenterror');
        const bodyTpl = this.renderTemplate(ErrorPaymentDialogBodyTpl, {
            conektaResponse,
        });

        console.log('body', bodyTpl);
        this.reRender({
            header: 'Pago no exitoso',
            body: bodyTpl,
            hasFooter: true,
            conektaResponse,
        });
    }
}