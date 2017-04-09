import BaseView from 'javascripts/shared/BaseView';

import AdminViewTpl from 'templates/admin/AdminView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this.render(AdminViewTpl);
    }
}
