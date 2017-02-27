import BaseCollection from 'javascripts/shared/BaseCollection';
import AppointmentModel from 'javascripts/shared/AppointmentModel';

export default class extends BaseCollection({
    model: AppointmentModel,
    dependencies: ['DateFormatter']
}) {
    initialize() {
        super.initialize();

        this.AVAILABLE_APPOINTMENT_TIMES = _.range(8, 19, 1);
    }

    getSelectOptions() {
        return this.map((model) => model.getSelectOption());
    }

    fetchAvailableAppointmentHours(date) {
        const formattedDate = this.DateFormatter.formatDate(date);

        return $.get('/api/appointments?date=' + formattedDate)
            .then((resp) => JSON.parse(resp))
            .then((items) => this._mapToAvailableAppointments(items, date))
            .then((items) => this.add(items));
    }

    _mapToAvailableAppointments(appointments, requestedDate) {
        const data = _.map(appointments, (app) => {
            const date = new Date(app.date);

            return date.getHours();
        });

        const baseDate = new Date(requestedDate);
        baseDate.setMinutes(0);
        baseDate.setSeconds(0);
        baseDate.setMilliseconds(0);

        const diff = _.difference(this.AVAILABLE_APPOINTMENT_TIMES, data);

        return _.map(diff, (time) => {
            const slotDate = new Date(baseDate.toJSON());
            slotDate.setHours(time);

            return { date: slotDate };
        });
    }
}