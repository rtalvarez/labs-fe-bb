import BaseModel from 'javascripts/shared/BaseModel';

export default class TypeaheadModel extends BaseModel() {
    constructor() {
        super();
    }

    initialize() {
        this.sayHello();
    }

    fetchData(url) {
        console.log('fetcherino');
    }
}