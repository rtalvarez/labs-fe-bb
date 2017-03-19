import PubSub from 'javascripts/PubSub';
import CONSTANTS from 'javascripts/shared/Constants';

export default (config) => class extends Backbone.Model.extend(config) {
    initialize() {
        this.PubSub = PubSub;
        this.CONSTANTS = CONSTANTS;
    }

    $get(url, queryParams) {
        const params = _.reduce(queryParams, (sum, value, param) => {
            if (sum === '') {
                return `?${param}=${value}`;
            }

            return `${sum}&${param}=${value}`;
        }, '');

        return $.get(`${url}${params}`);
    }

    _$request(url, data, method) {
        return $.ajax({
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            url,
            data: JSON.stringify(data),
        });
    }

    $put(url, data) {
        return this._$request(url, data, 'PUT');
    }

    $post(url, data) {
        return this._$request(url, data, 'POST');
    }

    toJSON(_model = this) {
        const attrs = _.clone(_model.attributes);
        const result = {};

        _.each(attrs, (value, name) => {
            let json;
            if (value instanceof Backbone.Model) {
                json = this.toJSON(value);
            } else if (Array.isArray(value)) {
                json = _.map(value, model => this.toJSON(model));
            } else if (value instanceof Date) {
                json = value.toJSON();
            } else {
                json = value;
            }

            result[name] = json;
        });

        return result;
    }
};