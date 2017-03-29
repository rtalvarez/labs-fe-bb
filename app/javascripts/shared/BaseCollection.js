import DependencyInjector from 'javascripts/utils/DependencyInjector';

export default (config) => class extends Backbone.Collection.extend(config) {
    initialize() {
        DependencyInjector.register(config, this);
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
}