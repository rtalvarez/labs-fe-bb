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
        this._baseUrl = config.url;

        this._onTypeaheadInputChange = _.debounce(this._onTypeaheadInputChange.bind(this), 300);
        this._$typeahead = this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_INPUT);
        this.transformData = config.transformData;
    }

    setTypeaheadData(data) {
        this._$typeahead.autocomplete({ data });
    }

    _onTypeaheadInputChange(evt) {
        const input = $(evt.target).val();
        const query = this._constructQuery(input);
        evt.preventDefault();

        if (input.length > 2) {
            this.fetchTypeaheadData(query)
                .then((data) => this.setTypeaheadData(data));
        }
    }

    fetchTypeaheadData(url) {
        return this.collection.fetch(url)
            .then((data) => this.collection.transformData(data));
    }

    _constructQuery(query) {
        return this._baseUrl.replace(/\$/, query);
    }
}