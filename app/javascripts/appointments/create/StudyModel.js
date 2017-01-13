import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel() {
    initialize(data) {
        super.initialize();

        this.set('pillTagName', this._getPillTagName(data));
    }

    _getPillTagName(data) {
        return `${data.name} ($${data.price})`;
    }
}