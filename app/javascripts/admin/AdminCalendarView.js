import BaseView from 'javascripts/shared/BaseView';
import AdminCalendarViewTpl from 'templates/admin/AdminCalendarView';
import { CALENDAR_CONFIG } from 'javascripts/admin/AdminCalendarConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            calendar: '.calendar',
        };

        this.render(AdminCalendarViewTpl);
        this.initCalendar();
    }

    initCalendar() {
        this.$find('calendar').fullCalendar(CALENDAR_CONFIG);
    }
}
