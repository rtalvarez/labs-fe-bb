import BaseView from 'javascripts/shared/BaseView';
import CapturePatientViewTpl from 'templates/appointments/create/CapturePatientView';

export default class CapturePatientView extends BaseView() {
    initialize() {
        this.render(CapturePatientViewTpl);
    }
}