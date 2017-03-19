import BaseView from 'javascripts/shared/BaseView';
import { DATEPICKER_OPTIONS } from 'javascripts/shared/DatepickerConfig';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);
        this._widgetId = config.id;

        this.initWidget();
        this.attachEvents();
    }

    _onDatepickerCloseClick(evt) {
        evt.preventDefault();

        this._$datepicker.trigger('close');
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
        config.onClose = () => this._onDatepickerClose();

        this._$datepicker = this.$el.pickadate(config);
    }

    _getDatepickerValue() {
        return this._$datepicker
            .pickadate('picker')
            .get('select');
    }

    _onDatepickerClose() {
        const evtName = this.CONSTANTS.EVENTS.DATEPICKER.CLOSE(this._widgetId);
        const date = this._getDatepickerValue();

        this.PubSub.trigger(evtName, date)
    }

    open() {
        this._$datepicker
            .pickadate('picker')
            .open();

        // setTimeout(() => {
        //     console.log('set event');
        //     $('.picker__close').click(() => {
        //         console.log('set asd ')
        //     })
        // }, 100);
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