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
        const attrs = _model.attributes ? _.clone(_model.attributes) : _model;
        const result = {};

        _.each(attrs, (value, name) => {
            let json;

            if (value === undefined) {
                console.warn('WARN: Attempted to JSONIFY undefined value at object:', _model, ' with key: ', name);
                return;
            }

            if (value instanceof Backbone.Model) {
                json = this.toJSON(value);
            } else if (Array.isArray(value) || value.models) {
                const elements = Array.isArray(value) ? value : value.models;

                json = _.map(elements, model => this.toJSON(model));
            } else if (value instanceof Date) {
                json = value.toJSON();
            } else if (typeof value === 'object') {
                _.each(value, model => this.toJSON(model));
                json = value;
            } else {
                json = value;
            }

            result[name] = json;
        });

        return result;
    }
};