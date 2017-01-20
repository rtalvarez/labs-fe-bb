import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel({
    // idAttribute: _getModelAttribute()
}) {
    initialize(data) {
        super.initialize();

        this.set('id', data.date.getTime());
    }

    getSelectOption() {
        return {
            value: this.get('id'),
            label: this.get('date').getHours(),
        };
    }
}