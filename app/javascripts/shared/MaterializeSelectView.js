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

        this._onMaterialSelectChange = _.debounce((evt) => this._emitChangeEvent(evt), 100);

        this.config = config;
        this.render(true);
    }

    render(isInit) {
        this.config.options = this.collection.getSelectOptions();
        this.config.disabled = isInit ? this.config.disabled : false;

        super.render(MaterializeSelectViewTpl, this.config);
        this.$el.find(this._selectors.select).material_select();
    }

    _onMaterialSelectChange() {}

    _emitChangeEvent(evt) {
        const evtName = this.CONSTANTS.EVENTS.MATERIAL_SELECT.ITEM_SELECTED(this.config.id);

        console.log('changerino', $(evt.target).val());
        this.PubSub.trigger(evtName, $(evt.target).val());
    }
}