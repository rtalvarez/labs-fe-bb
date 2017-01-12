import BaseView from 'javascripts/shared/BaseView';
import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize.call(this);
        this._datepickerConfig = config.datepickerConfig || DATEPICKER_OPTIONS;

        // Need a fresh jquery-iezed version of the element for the plugin to work /shrug
        this._$datepicker = this.$el.pickadate(this._datepickerConfig);
    }

    setDate(date) {
        const formattedDate = date
            .replace(/[()]/g,'')
            .split('/')
            .map((digit) => digit.length === 1 ? '0' + digit : digit)
            .join('/');

        // :aliens: this pickadate API
        this._$datepicker
            .pickadate('picker')
            .set('select', formattedDate, { format: 'mm/dd/yyyy' });
    }
}