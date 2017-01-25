import BaseView from 'javascripts/shared/BaseView';
import CapturePaymentViewTpl from 'templates/appointments/create/CapturePaymentView';

export default class extends BaseView({
    events: {
        'submit .capture-payment-form': '_onPaymentFormSubmit'
    }
}) {
    initialize() {
        this.render(CapturePaymentViewTpl);

        _.bindAll(this,
            '_onPaymentFormSubmit');
    }

    _onPaymentFormSubmit(evt) {
        evt.preventDefault();
        console.log('payment form');
    }
}