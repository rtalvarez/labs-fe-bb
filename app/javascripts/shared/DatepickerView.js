import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends Backbone.View.extend({}) {
    initialize(config) {
        this._datepickerConfig = config.datepickerConfig || DATEPICKER_OPTIONS;

        // Need a fresh jquery-iezed version of the element for the plugin to work /shrug
        this._$datepicker = $(this.$el).pickadate(this._datepickerConfig);
    }
}