import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel() {
    initialize(config) {
        super.initialize(config);
    }

    setDoB(date) {
        const userId = this.get('userId');

        return this.$put(`/api/patients/${userId}/dob`, {
            dateOfBirth: date
        });
    }
}