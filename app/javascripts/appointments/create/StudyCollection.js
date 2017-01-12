import BaseCollection from 'javascripts/shared/BaseCollection';
import StudyModel from 'javascripts/appointments/create/StudyModel';

export default class extends BaseCollection({
    model: StudyModel
}) {
    initialize() {
        super.initialize();
        this._typeaheadData = {};
    }

    fetch(query) {
        return $.get('/api/studies?query=' + query)
            .then((resp) => JSON.parse(resp))
            .then((items) => this.add(items));
    }

    transformData() {
        const data = {};

        this.each((study) => {
            const key = `${study.get('name')} ($ ${study.get('price')})`;

            if (!this._typeaheadData[key]) {
                data[key] = {
                    id: study.get('id'),
                };

                this._typeaheadData[key] = true;
            }
        });

        return data;
    }
}