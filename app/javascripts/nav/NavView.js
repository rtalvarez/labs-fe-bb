import BaseView from 'javascripts/shared/BaseView';
import NavTpl from 'templates/nav/NavView';

export default class NavView extends BaseView({
    events: {
        'click .schedule-appointment-action': 'onScheduleAppointmentClick'
    }
}) {
    initialize() {
        this.render(NavTpl);
    }

    onScheduleAppointmentClick(evt) {
        this.navigate(evt);
    }
}