import BaseView from 'javascripts/shared/BaseView';
import CapturePaymentViewTpl from 'templates/appointments/create/CapturePaymentView';
import BannerView from 'javascripts/shared/BannerView';

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
            '_enablePaymentForm',
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
            cardCountry: '#card-country',
            paymentDisabled: '.payment-disabled',
            paymentFieldset: '.payment-fieldset',
            submitPayment: '.submit-payment'
        };

        this._copy = {
            paymentDisabled: 'Favor de llenar la seccion de citas antes de proceder con el pago',
            paymentInvalid: 'Favor de revisar los campos en rojo y volver a intentar'
        };

        this.prefillTestingData();
        this.attachEvents();
        this.initViews();
    }

    checkForErrors() {
        const get = this.model.get.bind(this.model);
        const cardNumber = get('cardNumber');
        const cardCVC = get('cardCVC');
        const cardExpM = get('cardExpirationM');
        const cardExpY = get('cardExpirationY');
        const cardCP = get('cardCP');
        const errorFields = {
            cardholderName: _.isUndefined(get('cardholderName')),
            cardNumber: !cardNumber || cardNumber.length !== 16,
            cardCVC: !cardCVC || cardCVC.length !== 3, // TODO: Amex ?
            cardExpirationM: !cardExpM || cardExpM.length !== 2,
            cardExpirationY: !cardExpY || cardExpY.length !== 4,
            cardStreet: _.isUndefined(get('cardStreet')),
            cardTown: _.isUndefined(get('cardTown')),
            cardCity: _.isUndefined(get('cardCity')),
            cardState: _.isUndefined(get('cardState')),
            cardCP: !cardCP || cardCP.length !== 5,
            cardCountry: _.isUndefined(get('cardCountry')),
        };
        const errors = _.chain(errorFields)
            .map((error, fieldName) => error && { fieldName })
            .filter(_.identity)
            .value();

        _.each(errors, (error) => {
            this.$find(error.fieldName).addClass(this.CONSTANTS.CLASSES.INVALID);
        });

        const hasErrors = !_.isEmpty(errors);

        if (hasErrors) {
            this._bannerView
                .message(this._copy.paymentInvalid)
                .scrollTo();
        } else {
            this._bannerView.hide();
        }

        return hasErrors;
    }

    initViews() {
        this._bannerView = new BannerView({
            type: 'warning',
            msg: this._copy.paymentDisabled,
            el: this.$find('paymentDisabled')
        });
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

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.STEP1_COMPLETE, this._enablePaymentForm);
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.STEP1_INCOMPLETE, this._disablePaymentForm);
    }

    _disablePaymentForm() {
        this.$find('paymentFieldset').attr('disabled', true);
        this._bannerView.show();
    }

    _enablePaymentForm() {
        this.$find('paymentFieldset').attr('disabled', false);
        this._bannerView.hide();
    }

    _onPaymentFormSubmit(evt) {
        const $form = $(evt.target);

        evt.preventDefault();
        console.log('payment form', $form);

        window.Conekta.Token.create($form, this._onConektaSuccess, this._onConektaError);
    }

    submit() {
        this.$find('submitPayment').click();
    }

    _onConektaSuccess(data) {
        console.log('success', data);
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_SUCCESS, data, this.model);
    }

    _onConektaError(data) {
        console.log('error', data);
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_ERROR, data, this.model);
    }

    prefillTestingData() {
        const set = this.model.set.bind(this.model);

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

        set('cardholderName', 'Ondalacio Perez');
        set('cardNumber', '4242424242424242');
        set('cardCVC', '123');
        set('cardExpirationM', '10');
        set('cardExpirationY', '2020');
        set('cardStreet', 'Calle 123');
        set('cardTown', 'Colonia');
        set('cardCity', 'Ciudad');
        set('cardState', 'NL');
        set('cardCP', '62984');
        set('cardCountry', 'MX');
    }
}