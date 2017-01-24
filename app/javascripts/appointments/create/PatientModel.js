import BaseModel from 'javascripts/shared/BaseModel';

export default class PatientModel extends BaseModel() {
    initialize(data) {
        super.initialize(data);
        const dateOfBirth = new Date(data.dateOfBirth); // data.dateOfBirth is an ISO string

        this.set({
            dateOfBirth,
            displayDateOfBirth: dateOfBirth.toLocaleDateString()
        });
    }

    getTypeaheadLabel() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }
}