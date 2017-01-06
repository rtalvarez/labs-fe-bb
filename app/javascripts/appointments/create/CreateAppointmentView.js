import BaseView from 'javascripts/shared/BaseView';
import CreateAppointmentViewTpl from 'templates/appointments/create/CreateAppointmentView';
import CONSTANTS from 'javascripts/shared/Constants';

import CapturePatientView from 'javascripts/appointments/create/CapturePatientView';

export default class CreateAppointmentView extends BaseView {
    initialize() {
        this.render(CreateAppointmentViewTpl);
        console.log('Init create appointment!');

        this.initViews();
    }

    initViews() {
        this._capturePatientView = new CapturePatientView({
            el: this.$el.find(CONSTANTS.SELECTORS.CAPTURE_PATIENT_VIEW)
        });
    }
}