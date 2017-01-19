import BaseView from 'javascripts/shared/BaseView';

import MaterializeSelectViewTpl from 'templates/shared/MaterializeSelectView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize();

        this.options = config.options;
        this.render(MaterializeSelectViewTpl, config);
        this.initWidget();
    }

    initWidget() {
        this.$el.find('.material-select').material_select();
    }
}