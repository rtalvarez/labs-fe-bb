import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';

import AppointmentModel from 'javascripts/appointments/create/AppointmentModel';
import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';
import CaptureDetailsView from 'javascripts/appointments/create/CaptureDetailsView';
import CapturePaymentView from 'javascripts/appointments/create/CapturePaymentView';

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
            '_onNextStepClick');

        console.log('Init create appointment!');

        this._selectors = {
            step1Header: '.create-appointment-step-1-header',
            step2Header: '.create-appointment-step-2-header',
            capturePatientView: '.capture-patient-view',
            captureDoctorView: '.capture-doctor-view',
            captureDetailsView: '.capture-details-view',
            capturePaymentView: '.capture-payment-view'
        };

        this._step = 1;

        this.initCollapsibleHeaders();
        this.initViews();
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
    }

    _onNextStepClick(evt) {
        evt.preventDefault();

        switch (this._step) {
            case 1:
                this._processFirstStep();
                break;
        }

        this._step++;
    }

    _processFirstStep() {
        const patientErrors = this._capturePatientView.checkForErrors();
        const doctorErrors = this._captureDoctorView.checkForErrors();
        const detailsErrors = this._captureDetailsView.checkForErrors();

        if (!patientErrors && !doctorErrors && !detailsErrors) {
            console.log('submit form');
            this._firstStepSuccess();
        } else {
            console.log('show error message');
        }
    }

    _firstStepSuccess() {
        const $header = this.$el.find(this._selectors.step1Header);

        this.render(CollapsibleHeaderPanel, {
            valid: true
        }, $header);

        this._showStep(2);
    }

    _showStep(numStep) {
        this.$el.find(this._selectors[`step${numStep}Header`]).click();
    }
}