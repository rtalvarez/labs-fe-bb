import BaseView from 'javascripts/shared/BaseView';
import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);
        this._widgetId = config.id;

        this.initWidget();
        this.attachEvents();
    }

    attachEvents() {
        this._$datepicker.on('change', () => {
            const evtName = this.CONSTANTS.EVENTS.DATEPICKER.ITEM_SELECTED(this._widgetId);
            const date = this._$datepicker
                .pickadate('picker')
                .get('select');

            this.PubSub.trigger(evtName, date);
        });
    }

    initWidget() {
        const config = _.extend(this.config.datePickerConfig, DATEPICKER_OPTIONS);

        this._$datepicker = this.$el.pickadate(config);
    }

    /**
     * Sets a given date in the datepicker widget
     * @param {date} date The date object to use
     */
    setDate(date) {
        // :aliens: this pickadate API
        this._$datepicker
            .pickadate('picker')
            .set('select', date);
    }
}