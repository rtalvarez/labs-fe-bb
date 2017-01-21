import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel({
    // idAttribute: _getModelAttribute()
}) {
    initialize(data) {
        super.initialize();

        this.set('epochTime', data.date.getTime());
    }

    getSelectOption() {
        return {
            value: this.get('epochTime'),
            label: this.get('date').getHours(),
        };
    }
}