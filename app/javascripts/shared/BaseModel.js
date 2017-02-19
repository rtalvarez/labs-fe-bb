export default (config) => class extends Backbone.Model.extend(config) {
    initialize() {}

    post(url, data) {
        return $.ajax({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url,
            data: JSON.stringify(data),
        });
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
            } else {
                json = value;
            }

            result[name] = json;
        });

        return result;
    }
};