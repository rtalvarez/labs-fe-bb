import BaseView from 'javascripts/shared/BaseView';
import ComingSoonAppointmentCreateViewTpl from 'templates/coming-soon/appointment-create/ComingSoonAppointmentCreateView';

export default class extends BaseView({
    events: {
        'click .visit-contact-action': 'onVisitContactActionClick'
    }
}) {
    initialize(config) {
        super.initialize(config);

        _.bindAll(this,
            'onVisitContactActionClick');

        this.render(ComingSoonAppointmentCreateViewTpl);
    }

    onVisitContactActionClick(evt) {
        this.navigate(evt);
    }

}
