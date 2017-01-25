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
            '_onConektaSuccess',
            '_onConektaError',
            '_onPaymentFormSubmit');

        this.prefillTestingData();
    }

    _onPaymentFormSubmit(evt) {
        const $form = $(evt.target);
        evt.preventDefault();
        console.log('payment form', $form);

        window.Conekta.Token.create($form, this._onConektaSuccess, this._onConecktaError);
    }

    _onConektaSuccess(data) {
        console.log('success', data);
    }

    _onConektaError(data) {
        console.log('error', data);
    }

    prefillTestingData() {
        $('#cardholder-name').val('Ondalacio Perez');
        $('#card-number').val(4242424242424242);
        $('#card-cvc').val(123);
        $('#card-expiration-m').val(10);
        $('#card-expiration-y').val(2020);
        $('#card-street').val('Calle 123');
        $('#card-town').val('Colonia');
        $('#card-city').val('Ciudad');
        $('#card-state').val('NL');
        $('#card-cp').val(64920);
        $('#card-country').val('Mex');
    }
}