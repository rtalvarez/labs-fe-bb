import BaseView from 'javascripts/shared/BaseView';
import TypeaheadViewTpl from 'templates/shared/TypeaheadView';
import TypeaheadModel from 'javascripts/shared/TypeaheadModel';

import CONSTANTS from 'javascripts/shared/Constants';

export default class TypeaheadView extends BaseView({
    model: new TypeaheadModel(),
    events: {
        'input .typeahead-input': '_onTypeaheadInputChange'
    }
}) {
    initialize(config) {
        this.render(TypeaheadViewTpl);

        this._onTypeaheadInputChange = _.debounce(this._onTypeaheadInputChange.bind(this), 300);
        this._$typeahead = this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_INPUT);
        this.transformData = config.transformData;
    }

    setTypeaheadData(data) {
        // const data = JSON.parse('{"Ondalacio Contreras (1923/23/4)":{"id":1,"firstName":"Ondalacio","lastName":"Contreras","dateOfBirth":"1923/23/4"},"Ondalacio 2 Contreras 2 (1989/1/1)":{"id":2,"firstName":"Ondalacio 2","lastName":"Contreras 2","dateOfBirth":"1989/1/1"}}')
        console.log('setting', { data })
        // this._$typeahead.autocomplete({ data });
        $('.typeahead-input').autocomplete({ data });
    }

    _onTypeaheadInputChange(evt) {
        const query = $(evt.target).val();
        evt.preventDefault();

        if (query.length > 2) {
            this.fetchTypeaheadData(query)
                .then((data) => this.setTypeaheadData(data));
        }
    }

    fetchTypeaheadData(query) {
        return this.collection.fetch(query)
            .then((data) => this.collection.transformData(data));
    }
}