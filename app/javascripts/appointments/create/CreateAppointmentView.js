import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';

import AppointmentModel from 'javascripts/shared/AppointmentModel';
import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';
import CaptureDetailsView from 'javascripts/appointments/create/CaptureDetailsView';
import CapturePaymentView from 'javascripts/appointments/create/CapturePaymentView';
import BannerView from 'javascripts/shared/BannerView';
import ProcessingPaymentDialog from 'javascripts/appointments/create/ProcessingPaymentDialog';
import ConfirmAppointmentView from 'javascripts/appointments/create/ConfirmAppointmentView';

import CollapsibleHeaderPanel from 'templates/appointments/create/CollapsibleHeaderPanel';

export default class CreateAppointmentView extends BaseView({
    events: {
        'click .create-appointment-next': '_onNextStepClick',
        'click .collapsible-header': '_onCollapsibleHeaderClick'
    },
    model: new AppointmentModel({})
}) {
    initialize(config) {
        super.initialize(config);
        this.render(CreateAppointmentViewTpl, this);

        _.bindAll(this,
            '_showError',
            '_postAppointment',
            '_onCollapsibleHeaderClick',
            '_onNextStepClick');

        console.log('Init create appointment!');

        this._selectors = {
            step1Header: '.create-appointment-step-1-header',
            step2Header: '.create-appointment-step-2-header',
            step3Header: '.create-appointment-step-3-header',
            capturePatientView: '.capture-patient-view',
            captureDoctorView: '.capture-doctor-view',
            captureDetailsView: '.capture-details-view',
            capturePaymentView: '.capture-payment-view',
            formHasErrors: '.form-has-errors-banner',
            processingAppointmentDialog: '#processing-appointment-dialog',
            confirmAppointment: '.confirm-appointment-view',
            collapsibleHeader: '.collapsible-header'
        };

        this._copy = {
            formHasErrors: 'Por favor, corrige los campos en rojo y vuelve a intentar',
        };

        this._step = 1;
        this.views = {};

        this.initCollapsibleHeaders();
        this.initViews();
        this.prefillTestData();
        this.attachEvents();
    }

    prefillTestData() {
        this.model.set('date', new Date());
        this.model.set('patient', new Backbone.Model({
            firstName: 'Ondalacion',
            lastName: 'Contreras',
            dateOfBirth: new Date(),
        }));
        this.model.set('doctor', new Backbone.Model({
            firstName: 'Ondalacion',
            lastName: 'Contreras',
        }));
        this.model.set('studies', [new Backbone.Model({
            name: 'estudio 1',
            price: 10,
            id: 1,
            description: 'descripcion'
        })]);

        this.views._capturePatient._selectedPatient = this.model.get('patient');
        this.views._captureDoctor._selectedDoctor = this.model.get('doctor');
        this.views._captureDetails._selectedStudies = this.model.get('studies');
        this.views._captureDetails._selectedAppointment = this.model;
        this.views._captureDetails._selectedTime = 123;
    }

    attachEvents() {
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_SUCCESS, this._postAppointment);
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.CONEKTA.PAYMENT_ERROR, this._showError);
    }

    initCollapsibleHeaders() {
        this.$el.find(this.CONSTANTS.SELECTORS.COLLAPSIBLE).collapsible();
    }

    initViews() {
        const $el = this.$el;
        const model = this.model;
        const selectors = this._selectors;

        this.views._capturePatient = new CapturePatientView({
            el: $el.find(selectors.capturePatientView),
            appointmentModel: model,
            auth: this.config.auth,
            canSearch: false,
        });

        this.views._captureDoctor = new CaptureDoctorView({
            el: $el.find(selectors.captureDoctorView),
            appointmentModel: model,
        });

        this.views._captureDetails = new CaptureDetailsView({
            el: $el.find(selectors.captureDetailsView),
            appointmentModel: model,
        });

        this.views._capturePayment = new CapturePaymentView({
            el: $el.find(selectors.capturePaymentView)
        });

        this.views._banner = new BannerView({
            type: 'warning',
            msg: this._copy.formHasErrors,
            el: this.$find('formHasErrors'),
            hidden: true,
        });

        this.views._processingPaymentDialog = new ProcessingPaymentDialog({
            el: this.$find('processingAppointmentDialog'),
            dismissible: false,
        });

        this.views._confirmAppointment = new ConfirmAppointmentView({
            el: this.$find('confirmAppointment'),
            appointmentModel: model,
            paymentModel: this.views._capturePayment.model
        });
    }

    _showError(data) {
        console.log('show error', data);
    }

    _postAppointment(conektaResponse, paymentModel) {
        // Do not send card data to our servers - just the conekta token
        paymentModel.set('cardNumber', conektaResponse.id);

        const appointment = this.model.toJSON();
        const payment = paymentModel.toJSON();

        const request = {
            payment,
            appointment,
        };

        this.model.postAppointment(request)
            .then((resp) => {
                console.log('resp', resp);
                this.PubSub.trigger(this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.APPOINTMENT_CREATED);
            })
            .catch(resp => {
                this.PubSub.trigger(this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.APPOINTMENT_NOT_CREATED, resp);
            });
    }

    _onNextStepClick(evt) {
        evt.preventDefault();

        switch (this._step) {
            case 1:
                this._processFirstStep();
                break;

            case 2:
                this._processSecondStep();
                break;

            case 3:
                this._processThirdStep();
                break;
        }
    }

    _processThirdStep() {
        this.views._processingPaymentDialog.open();
        this.views._capturePayment.submit();
    }

    _processSecondStep() {
        const hasErrors = this.views._capturePayment.checkForErrors();

        if (!hasErrors) {
            this._secondStepSuccess();
        }
    }


    _secondStepSuccess() {
        this._renderSuccessCollapsibleHeader();
        this.views._confirmAppointment.render();
        this._showStep(3);
    }

    _processFirstStep() {
        const patientErrors = this.views._capturePatient.checkForErrors();
        const doctorErrors = this.views._captureDoctor.checkForErrors();
        const detailsErrors = this.views._captureDetails.checkForErrors();

        if (!patientErrors && !doctorErrors && !detailsErrors) {
            console.log('submit form');
            this._firstStepSuccess();
        } else {
            this._firstStepFailure();
            console.log('show error message');
        }
    }

    _firstStepFailure() {
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.STEP1_INCOMPLETE);
        this.views._banner
            .show()
            .scrollTo();
    }

    _firstStepSuccess() {
        this._renderSuccessCollapsibleHeader();
        this._showStep(2);

        this.views._banner.hide();
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.STEP1_COMPLETE);
    }

    _renderSuccessCollapsibleHeader() {
        const $header = this.$find(`step${this._step}Header`);

        this.render(CollapsibleHeaderPanel, {
            valid: true,
        }, $header);
    }

    _showStep(numStep) {
        this._step++;
        this.$el.find(this._selectors[`step${numStep}Header`]).click();
    }

    _onCollapsibleHeaderClick(evt) {
        const stepNumber = $(evt.target)
            .closest(this._selectors.collapsibleHeader)
            .data('step');

        this._step = stepNumber;
    }
}