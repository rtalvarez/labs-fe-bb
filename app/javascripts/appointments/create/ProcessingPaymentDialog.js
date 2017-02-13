import DialogView from 'javascripts/shared/DialogView';

import ProcessingPaymentDialogBodyTpl from 'templates/appointments/create/ProcessingPaymentDialogBody';
import ErrorPaymentDialogBodyTpl from 'templates/appointments/create/ErrorPaymentDialogBody';

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
    }

    paymentError() {
        console.log('pego en paymenterror');
        this.reRender({
            header: 'Pago no exitoso',
            body: ErrorPaymentDialogBodyTpl
        });
    }
}