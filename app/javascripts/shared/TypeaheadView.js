import BaseView from 'javascripts/shared/BaseView';
import TypeaheadViewTpl from 'templates/shared/TypeaheadView';
import TypeaheadModel from 'javascripts/shared/TypeaheadModel';
import PubSub from 'javascripts/PubSub';

import CONSTANTS from 'javascripts/shared/Constants';

export default class TypeaheadView extends BaseView({
    model: new TypeaheadModel(),
    events: {
        'input .typeahead-input': '_onTypeaheadInputChange'
    }
}) {
    initialize(config) {
        super.initialize.call(this);
        this.render(TypeaheadViewTpl);

        this._onTypeaheadInputChange = _.debounce(this._onTypeaheadInputChange.bind(this), 300);
        this._$typeahead = this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_INPUT);
        this.transformData = config.transformData;
        this._typeaheadId = config.id;

        this.attachEvents();
    }

    attachEvents() {
        this._$typeahead.on('change', (evt, evtData) => this._onTypeaheadItemSelected(evt, evtData));
    }

    setTypeaheadData(data) {
        this._$typeahead.autocomplete({ data });
    }

    _onTypeaheadInputChange(evt) {
        const query = $(evt.target).val();
        evt.preventDefault();

        if (query.length > 2) {
            this.fetchTypeaheadData(query)
                .then((data) => this.setTypeaheadData(data));
        }
    }

    _onTypeaheadItemSelected(evt, evtData) {
        if (!evtData) {
            return;
        }

        evt.preventDefault();
        PubSub.trigger(CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(this._typeaheadId), {
            selectedItemId: evtData.option.data('id'),
        });
    }

    fetchTypeaheadData(query) {
        return this.collection.fetch(query)
            .then((data) => this.collection.transformData(data));
    }
}