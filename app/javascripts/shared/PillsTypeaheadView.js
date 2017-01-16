import BaseView from 'javascripts/shared/BaseView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import PillsTypeaheadViewTpl from 'templates/shared/PillsTypeaheadView';

export default class extends BaseView() {
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
        this.$el.find('.chips').on('chip.delete', (evt, pill) => this._deletePill(evt, pill));
    }

    initViews(config) {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.TYPEAHEAD_INPUT),
            collection: config.collection,
            id: config.id
        });
    }

    _deletePill(evt, pill) {
        evt.preventDefault();

        delete this._pillTagNames[pill.tag];
    }

    _addChip(tagName, selectedEntity) {
        this._pillTagNames[tagName] = selectedEntity;

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
        const constants = this.CONSTANTS;

        this._addChip(pillTagName, selectedEntity);
        this.$el.find(constants.SELECTORS.INPUT)
            .addClass(constants.CLASSES.HIDDEN);

        this.$el.find(constants.SELECTORS.TYPEAHEAD_INPUT)
            .val('');
    }
}