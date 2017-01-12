import BaseView from 'javascripts/shared/BaseView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import PillsTypeaheadViewTpl from 'templates/shared/PillsTypeaheadView';

export default class extends BaseView({

}) {
    initialize(config) {
        super.initialize();
        this.render(PillsTypeaheadViewTpl);

        this.initViews(config);
    }

    initViews(config) {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.TYPEAHEAD_INPUT),
            collection: config.collection,
            id: config.id
        });
    }
}