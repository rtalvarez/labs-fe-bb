import BaseCollection from 'javascripts/shared/BaseCollection';
import AppointmentModel from 'javascripts/appointments/create/AppointmentModel';

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
            .then((items) => this._mapToAvailableAppointments(items))
            .then((items) => this.add(items));
    }

    _mapToAvailableAppointments(appointments) {
        const data = _.map(appointments, (app) => {
            const date = new Date(app.date);

            return date.getHours();
        });

        const diff = _.difference(this.AVAILABLE_APPOINTMENT_TIMES, data);

        return _.map(diff, (time) => {
            const date = new Date();

            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            date.setHours(time);

            return { date };
        });
    }
}