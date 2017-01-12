import BaseCollection from 'javascripts/shared/BaseCollection';
import DoctorModel from 'javascripts/appointments/create/DoctorModel';

export default class DoctorCollection extends BaseCollection({
    model: DoctorModel
}) {
    initialize() {
        this._typeaheadData = {};
    }

    fetch(query) {
        return $.get('/api/doctors?query=' + query)
            .then((resp) => JSON.parse(resp))
            .then((items) => this.add(items));
    }

    transformData() {
        const data = {};

        this.each((doctor) => {
            const key = `${doctor.get('firstName')} ${doctor.get('lastName')}`;

            if (!this._typeaheadData[key]) {
                data[key] = {
                    id: doctor.get('id'),
                };

                this._typeaheadData[key] = true;
            }
        });

        return data;
    }
}