export default class {
    constructor() {}

    formatDate(date) {
        if (date instanceof Date) {
            return _.first(date.toJSON().split('T'));
        } else if (typeof date === 'string') {
            return _.first(date.split('T'));
        }
    }

    _formatDigit(digit) {
        return digit.substring(digit.length - 2, digit.length);
    }
}