import BaseView from 'javascripts/shared/BaseView';
import DialogViewTpl from 'templates/shared/DialogView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);
        this._dialogId = this.$el.attr('id');

        this._selectors = {
            dialog: `#${this._dialogId}`
        };

        this.render(DialogViewTpl, config);
        this.initDialog();
    }

    initDialog() {
        this.$el.modal(this.config);
    }

    open() {
        this.$el.modal('open');
    }

    close() {
        this.$el.modal('close');
    }

    reRender(config) {
        this.render(DialogViewTpl, config);
    }
}