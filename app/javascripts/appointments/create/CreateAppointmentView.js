import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';
import CONSTANTS from 'javascripts/shared/Constants';

import CaptureDoctorView from 'javascripts/appointments/create/CaptureDoctorView';
import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';

export default class CreateAppointmentView extends BaseView() {
    initialize() {
        this.render(CreateAppointmentViewTpl);
        console.log('Init create appointment!');

        this.initViews();
    }

    initViews() {
        const $el = this.$el;

        this._capturePatientView = new CapturePatientView({
            el: $el.find(CONSTANTS.SELECTORS.CAPTURE_PATIENT_VIEW)
        });

        this._captureDoctorView = new CaptureDoctorView({
            el: $el.find(CONSTANTS.SELECTORS.CAPTURE_DOCTOR_VIEW)
        });
    }
}