import BaseView from 'javascripts/shared/BaseView';
import AdminViewTpl from 'templates/admin/AdminView';

import AdminCalendarView from 'javascripts/admin/AdminCalendarView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            calendar: '.calendar-view',
        };

        this.render(AdminViewTpl);
        this.initViews();
    }

    initViews() {
        this.views.calendar = new AdminCalendarView({
            el: this.$find('calendar'),
        });
    }
}
