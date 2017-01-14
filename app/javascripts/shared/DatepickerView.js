import BaseView from 'javascripts/shared/BaseView';
import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize.call(this);
        this._datepickerConfig = config.datepickerConfig || DATEPICKER_OPTIONS;
        this._widgetId = config.id;

        this.initWidget();
        this.attachEvents();
    }

    attachEvents() {
        this._$datepicker.on('change', () => {
            const evtName = this.CONSTANTS.EVENTS.DATEPICKER.ITEM_SELECTED(this._widgetId);
            const formattedDate = this._getFormattedDate();

            this.PubSub.trigger(evtName, formattedDate);
        });
    }

    initWidget() {
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

    _getFormattedDate() {
        const data = this._$datepicker
            .pickadate('picker')
            .get('select');

        data.month = data.month + 1;

        _.chain(data)
            .pick('date', 'month', 'year')
            .each((val, key) => data[key] = String(val))
            .value();

        const elements = [
            data.month.length === 2 ? data.month : `0${data.month}`,
            data.date.length === 2 ? data.date : `0${data.date}`,
            data.year
        ];

        return elements.join('/');
    }
}