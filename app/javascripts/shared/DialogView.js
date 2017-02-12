import BaseView from 'javascripts/shared/BaseView';
import DialogViewTpl from 'templates/shared/DialogView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);

        this._selectors = {
            dialogWrapper: '.dialog-wrapper',
            dialog: `#${config.dialogId}`
        };

        this.render(DialogViewTpl, config);
        this.initDialog();
    }

    initDialog() {
        // this.$find('dialog').modal();
        console.log('register on', this._selectors.dialog);
        $(this._selectors.dialog).modal({
            // dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log("Ready");
                console.log(modal, trigger);
            },
            complete: function() { console.log('Closed'); } // Callback for Modal close
        });
    }

    open() {
        this.$find('dialog').modal('open');
    }

    close() {
        this.$find('dialog').modal('close');
    }
}