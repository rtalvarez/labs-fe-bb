import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavView extends BaseView({
    events: {
        'click .schedule-appointment-action': 'onScheduleAppointmentClick',
        'click .do-login-action': 'onLoginClick'
    }
}) {
    initialize() {
        this.render(NavTpl);
    }

    onScheduleAppointmentClick(evt) {
        this.navigate(evt);
    }

    onLoginClick(evt) {
        this.navigate(evt);
    }
}