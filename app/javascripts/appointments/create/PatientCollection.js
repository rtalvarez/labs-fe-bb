import BaseCollection from 'javascripts/shared/BaseCollection';
import PatientModel from 'javascripts/appointments/create/PatientModel';

export default class PatientCollection extends BaseCollection({
    model: PatientModel
}) {
    initialize() {
        this._typeaheadData = {};
    }

    fetch(query) {
        return $.get('/api/patients?query=' + query)
           .then((resp) => JSON.parse(resp))
           .then((items) => this.add(items));
    }

    transformData() {
        const data = {};

        this.each((patient) => {
            const key = patient.getTypeaheadLabel();

            if (!this._typeaheadData[key]) {
                data[key] = {
                    id: patient.get('id'),
                };

                this._typeaheadData[key] = true;
            }
        });

        return data;
    }
}