import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel({
}) {
    initialize(data) {
        super.initialize();

        _.bindAll(this,
            '_onStudiesChange',
            '_onDateChange');

        if (data.date instanceof Date) {
            this.set('epochTime', data.date.getTime());
        }

        this.attachEvents();
    }

    attachEvents() {
        this.on('change:date', this._onDateChange);
        this.on('change:studies', this._onStudiesChange);
    }

    _onDateChange() {
        const date = this.get('date');

        this.set('displayDate', date.toLocaleString());
    }

    _onStudiesChange() {
        const studies = this.get('studies');
        const grandTotal = _.reduce(studies, (total, study) => total + study.get('price'), 0);
        const studyDisplayNames = _.reduce(studies, (display, study) => `${display} ${study.get('name')}`, '').trim();

        this.set({
            grandTotal,
            studyDisplayNames,
        });
    }

    getSelectOption() {
        return {
            value: this.get('epochTime'),
            label: this.get('date').getHours(),
        };
    }

    postAppointment(request) {
        return this.$post('/api/appointments/create', request);
    }
}