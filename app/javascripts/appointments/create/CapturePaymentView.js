import BaseView from 'javascripts/shared/BaseView';
import CapturePaymentViewTpl from 'templates/appointments/create/CapturePaymentView';

export default class extends BaseView() {
    initialize() {
        this.render(CapturePaymentViewTpl);
    }
}