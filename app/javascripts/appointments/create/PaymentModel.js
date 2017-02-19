import BaseModel from 'javascripts/shared/BaseModel';

export default class extends BaseModel() {
    constructor() {
        super();
    }

    initialize(data) {
        super.initialize(data);

        _.bindAll(this,
            '_onCardNumberChange');

        this.attachEvents();
    }

    attachEvents() {
        this.on('change:cardNumber', this._onCardNumberChange);
    }

    _onCardNumberChange() {
        const cardNumber = this.get('cardNumber');
        const lastFour = cardNumber.substring(12, cardNumber.length);

        this.set('displayCardNumber', `**** **** **** ${lastFour}`);
    }
}