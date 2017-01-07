import BaseCollection from 'javascripts/shared/BaseCollection';
import PatientModel from 'javascripts/appointments/create/PatientModel';

export default class PatientCollection extends BaseCollection({
    model: PatientModel
}) {
    initialize() {

    }

    fetch(query) {
       return $.get('/api/patients?query=' + query)
           .then((resp) => JSON.parse(resp));
    }

    transformData(patients) {
        debugger;
        const data = {};

        _.each(patients, (patient) => {
            const key = `${patient.firstName} ${patient.lastName} (${patient.DoB})`;

            data[key] = patient;
        });

        return data;
    }
}