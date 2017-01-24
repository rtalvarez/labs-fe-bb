export default class {
    constructor() {}

    formatDate(date) {
        const dateObj = new Date(date);
        const month = '0' + (dateObj.getMonth() + 1);
        const day = '0' + dateObj.getDate();

        return `${dateObj.getFullYear()}-${this._formatDigit(month)}-${this._formatDigit(day)}`;
    }

    _formatDigit(digit) {
        return digit.substring(digit.length - 2, digit.length);
    }
}