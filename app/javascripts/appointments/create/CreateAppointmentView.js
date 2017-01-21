import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';

import AppointmentModel from 'javascripts/appointments/create/AppointmentModel';
import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';
import CaptureDetailsView from 'javascripts/appointments/create/CaptureDetailsView';

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
            step2Header: '.create-appointment-step-2-header'
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

        this._capturePatientView = new CapturePatientView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_PATIENT_VIEW),
            appointmentModel: model,
        });

        this._captureDoctorView = new CaptureDoctorView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_DOCTOR_VIEW),
            appointmentModel: model,
        });

        this._captureDetailsView = new CaptureDetailsView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_DETAILS_VIEW),
            appointmentModel: model,
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