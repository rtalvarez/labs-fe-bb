import DialogView from 'javascripts/shared/DialogView';

import ProcessingPaymentDialogBodyTpl from 'templates/appointments/create/ProcessingPaymentDialogBody';

export default class extends DialogView {
    initialize(config) {
        this._copy = {
            processing: {
                header: 'Un segundo, por favor ..',
                body: ProcessingPaymentDialogBodyTpl
            }
        };

        config.header = this._copy.processing.header;
        config.body = this._copy.processing.body;

        super.initialize(config);
    }
}