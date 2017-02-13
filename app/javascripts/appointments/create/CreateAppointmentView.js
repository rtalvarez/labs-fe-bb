import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';

import AppointmentModel from 'javascripts/appointments/create/AppointmentModel';
import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';
import CaptureDetailsView from 'javascripts/appointments/create/CaptureDetailsView';
import CapturePaymentView from 'javascripts/appointments/create/CapturePaymentView';
import BannerView from 'javascripts/shared/BannerView';
import ProcessingPaymentDialog from 'javascripts/appointments/create/ProcessingPaymentDialog';

import CollapsibleHeaderPanel from 'templates/appointments/create/CollapsibleHeaderPanel';

export default class CreateAppointmentView extends BaseView({
    events: {
        'click .create-appointment-next': '_onNextStepClick'
    },
    model: new AppointmentModel({})
}) {
    initialize() {
        super.initialize();
        this.render(CreateAppointmentViewTpl, this);

        _.bindAll(this,
            '_showError',
            '_postAppointment',
            '_onNextStepClick');

        console.log('Init create appointment!');

        this._selectors = {
            step1Header: '.create-appointment-step-1-header',
            step2Header: '.create-appointment-step-2-header',
            capturePatientView: '.capture-patient-view',
            captureDoctorView: '.capture-doctor-view',
            captureDetailsView: '.capture-details-view',
            capturePaymentView: '.capture-payment-view',
            formHasErrors: '.form-has-errors-banner',
            processingAppointmentDialog: '#processing-appointment-dialog'
        };

        this._copy = {
            formHasErrors: 'Por favor, corrige los campos en rojo y vuelve a intentar',
        };

        this._step = 1;

        this.initCollapsibleHeaders();
        this.initViews();
        this.attachEvents();
        this.prefillTestData();
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

        this._capturePatientView._selectedPatient = this.model.get('patient');
        this._captureDoctorView._selectedDoctor = this.model.get('doctor');
        this._captureDetailsView._selectedStudies = this.model.get('studies');
        this._captureDetailsView._selectedAppointment = this.model;
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

        this._capturePatientView = new CapturePatientView({
            el: $el.find(selectors.capturePatientView),
            appointmentModel: model,
        });

        this._captureDoctorView = new CaptureDoctorView({
            el: $el.find(selectors.captureDoctorView),
            appointmentModel: model,
        });

        this._captureDetailsView = new CaptureDetailsView({
            el: $el.find(selectors.captureDetailsView),
            appointmentModel: model,
        });

        this._capturePaymentView = new CapturePaymentView({
            el: $el.find(selectors.capturePaymentView)
        });

        this._bannerView = new BannerView({
            type: 'warning',
            msg: this._copy.formHasErrors,
            el: this.$find('formHasErrors'),
            hidden: true,
        });

        this._dialogView = new ProcessingPaymentDialog({
            el: this.$find('processingAppointmentDialog'),
            dismissible: false,
        });
    }

    _showError(data) {
        console.log('show error', data);
    }

    _postAppointment(conektaResponse, paymentModel) {
        // Do not send card data to our servers - just the conekta token
        paymentModel.set('cardNumber', conektaResponse.id);

        const appointment = this.model.toJSON();
        appointment.doctor = appointment.doctor.toJSON();
        appointment.patient = appointment.patient.toJSON();
        appointment.date = appointment.date.toJSON();
        appointment.studies = _.map(appointment.studies, study => study.toJSON());
        appointment.patient.dateOfBirth = appointment.patient.dateOfBirth.toJSON();

        const request = {
            payment: paymentModel.toJSON(),
            appointment,
        };

        console.log('post app', request);
        this.model.postAppointment(request)
            .then((resp) => {
                console.log('resp', resp);
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
        }

        this._step++;
    }

    _processSecondStep() {
        this._dialogView.open();
        this._capturePaymentView.submit();
    }

    _processFirstStep() {
        const patientErrors = this._capturePatientView.checkForErrors();
        const doctorErrors = this._captureDoctorView.checkForErrors();
        const detailsErrors = this._captureDetailsView.checkForErrors();

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
        this._bannerView.show();
    }

    _firstStepSuccess() {
        const $header = this.$el.find(this._selectors.step1Header);

        this.render(CollapsibleHeaderPanel, {
            valid: true
        }, $header);

        this._showStep(2);
        this._bannerView.hide();
        this.PubSub.trigger(this.CONSTANTS.EVENTS.CREATE_APPOINTMENTS.STEP1_COMPLETE);
    }

    _showStep(numStep) {
        this.$el.find(this._selectors[`step${numStep}Header`]).click();
    }
}