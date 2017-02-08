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
};