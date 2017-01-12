import BaseModel from 'javascripts/shared/BaseModel';

export default class TypeaheadModel extends BaseModel() {
    constructor() {
        super();
    }

    initialize(data) {
        super.initialize(data);
    }

    fetchData(url) {
        console.log('fetcherino');

        return $.get(url);
    }
}