import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';

import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';
import CaptureDetailsView from 'javascripts/appointments/create/CaptureDetailsView';

export default class CreateAppointmentView extends BaseView() {
    initialize() {
        super.initialize();
        this.render(CreateAppointmentViewTpl);
        console.log('Init create appointment!');

        this.initViews();
    }

    initViews() {
        const $el = this.$el;

        this._capturePatientView = new CapturePatientView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_PATIENT_VIEW)
        });

        this._captureDoctorView = new CaptureDoctorView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_DOCTOR_VIEW)
        });

        this._captureDetailsView = new CaptureDetailsView({
            el: $el.find(this.CONSTANTS.SELECTORS.CAPTURE_DETAILS_VIEW)
        });
    }
}