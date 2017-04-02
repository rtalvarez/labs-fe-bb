import BaseModel from 'javascripts/shared/BaseModel'

export default class extends BaseModel() {
    initialize(config) {
        super.initialize(config);
    }

    fetchUserId(data) {
        return this.$get('/api/patients/me', data)
            .then(({ id }) => this.set('userId', id))
            .then(() => this.get('userId'));
    }

    onFetchedUserId(userId) {
        const dfd = new $.Deferred();

        if (userId === 0) {
            this.createUser()
                .then(id => dfd.resolve(id));
        } else {
            dfd.resolve(userId);
        }

        return dfd.promise();
    }

    _postUser(user) {
        return this.$post('/api/patients/create', user)
            .then(response => response.id);
    }

    getTemplateData() {
        return {
            authProviderName: this.get('providerName'),
            name: this.get('userName'),
            dateOfBirth: this.get('dateOfBirth'),
            email: this.get('email'),
            imageUrl: this.get('imageUrl')
        };
    }
}