import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel({
}) {
    initialize(data) {
        super.initialize();

        if (data.date) {
            this.set('epochTime', data.date.getTime());
        }
    }

    getSelectOption() {
        return {
            value: this.get('epochTime'),
            label: this.get('date').getHours(),
        };
    }

    postAppointment(request) {
        return this.post('/api/appointments/create', request);
    }
}