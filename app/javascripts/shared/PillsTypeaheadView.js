import BaseView from 'javascripts/shared/BaseView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import PillsTypeaheadViewTpl from 'templates/shared/PillsTypeaheadView';

export default class extends BaseView({

}) {
    initialize(config) {
        super.initialize();
        this.render(PillsTypeaheadViewTpl);

        this._$pills = this.$el.find(this.CONSTANTS.SELECTORS.CHIPS);
        this._pillTagNames = {};

        this.initViews(config);
        this.attachEvents(config);
    }

    attachEvents(config) {
        const eventName = this.CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(config.id);

        this.listenTo(this.PubSub, eventName, (data) => this._onTypeaheadItemSelected(data));
    }

    initViews(config) {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.TYPEAHEAD_INPUT),
            collection: config.collection,
            id: config.id
        });
    }

    _addChip(tagName) {
        this._pillTagNames[tagName] = true;

        const tagNames = _.chain(this._pillTagNames)
            .keys()
            .map((keyName) => ({ tag: keyName }))
            .value();

        this._$pills.material_chip({
            data: tagNames
        });
    }

    _onTypeaheadItemSelected(data) {
        const selectedEntity = this.collection.get(data.selectedItemId);
        const pillTagName = selectedEntity.get('pillTagName');

        console.log('selected entity', selectedEntity);
        this._addChip(pillTagName);
        this.$el.find('.input').addClass('hidden');
        this.$el.find('.typeahead-input').val('');
    }
}