import BaseView from 'javascripts/shared/BaseView';
import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize.call(this);
        this._datepickerConfig = config.datepickerConfig || DATEPICKER_OPTIONS;

        // Need a fresh jquery-iezed version of the element for the plugin to work /shrug
        this._$datepicker = this.$el.pickadate(this._datepickerConfig);
    }
}