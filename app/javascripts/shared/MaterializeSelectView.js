import BaseView from 'javascripts/shared/BaseView';

import MaterializeSelectViewTpl from 'templates/shared/MaterializeSelectView';

export default class extends BaseView({
    events: {
        'change .material-select': '_onMaterialSelectChange'
    }
}) {
    initialize(config) {
        super.initialize();

        _.bindAll(this,
            '_onMaterialSelectChange');

        this._selectors = {
            select: '.material-select',
            renderedSelect: 'input.select-dropdown'
        };

        this.config = config;
        this.render(true);
    }

    render(isInit) {
        this.config.options = this.collection.getSelectOptions();
        this.config.disabled = isInit ? this.config.disabled : false;

        super.render(MaterializeSelectViewTpl, this.config);
        this.$el.find(this._selectors.select).material_select();
    }

    // TODO: fix, this event runs twice
    _onMaterialSelectChange(evt) {
        const evtName = this.CONSTANTS.EVENTS.MATERIAL_SELECT.ITEM_SELECTED(this.config.id);

        this.PubSub.trigger(evtName, $(evt.target).val());
    }
}