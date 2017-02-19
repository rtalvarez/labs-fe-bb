import BaseView from 'javascripts/shared/BaseView';
import DialogViewTpl from 'templates/shared/DialogView';

export default class extends BaseView({
    events: {
        'click .modal-close': 'close'
    }
}) {
    initialize(config) {
        super.initialize(config);
        this._dialogId = this.$el.attr('id');

        _.bindAll(this,
            '_onDialogClose');

        this._selectors = {
            dialog: `#${this._dialogId}`
        };

        this.render(DialogViewTpl, config);
        this.initDialog();
    }

    initDialog() {
        this.config.complete = this._onDialogClose;

        this.$el.modal(this.config);
    }

    _onDialogClose() {
        this.trigger(this.CONSTANTS.EVENTS.DIALOG.CLOSED);
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