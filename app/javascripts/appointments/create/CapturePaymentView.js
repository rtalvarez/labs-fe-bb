import BaseView from 'javascripts/shared/BaseView';
import CapturePaymentViewTpl from 'templates/appointments/create/CapturePaymentView';

import PaymentModel from 'javascripts/appointments/create/PaymentModel';

export default class extends BaseView({
    events: {
        'submit .capture-payment-form': '_onPaymentFormSubmit'
    },
    model: new PaymentModel()
}) {
    initialize() {
        super.initialize();
        this.render(CapturePaymentViewTpl);

        _.bindAll(this,
            '_onConektaSuccess',
            '_onConektaError',
            '_onPaymentFormSubmit');

        this._selectors = {
            cardholderName: '#cardholder-name',
            cardNumber: '#card-number',
            cardCVC: '#card-cvc',
            cardExpirationM: '#card-expiration-m',
            cardExpirationY: '#card-expiration-y',
            cardStreet: '#card-street',
            cardTown: '#card-town',
            cardCity: '#card-city',
            cardState: '#card-state',
            cardCP: '#card-cp',
            cardCountry: '#card-country'
        };

        this.prefillTestingData();
        this.attachEvents();
    }

    attachEvents() {
        this.bindToModel('cardholderName', 'model', 'cardholderName');
        this.bindToModel('cardNumber', 'model', 'cardNumber');
        this.bindToModel('cardCVC', 'model', 'cardCVC');
        this.bindToModel('cardExpirationM', 'model', 'cardExpirationM');
        this.bindToModel('cardExpirationY', 'model', 'cardExpirationY');
        this.bindToModel('cardStreet', 'model', 'cardStreet');
        this.bindToModel('cardTown', 'model', 'cardTown');
        this.bindToModel('cardCity', 'model', 'cardCity');
        this.bindToModel('cardState', 'model', 'cardState');
        this.bindToModel('cardCP', 'model', 'cardCP');
        this.bindToModel('cardCountry', 'model', 'cardCountry');
    }

    _onPaymentFormSubmit(evt) {
        const $form = $(evt.target);
        evt.preventDefault();
        console.log('payment form', $form);

        window.Conekta.Token.create($form, this._onConektaSuccess, this._onConecktaError);
    }

    _onConektaSuccess(data) {
        console.log('success', data);
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_SUCCESS, data, this.model);
    }

    _onConektaError(data) {
        console.log('error', data);
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_SUCCESS, data, this.model);
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