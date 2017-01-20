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


        window.c = this;
        this._onMaterialSelectChange = _.debounce((evt) => this._emitChangeEvent(evt), 100);

        this.config = config;
        this.render(true);
    }

    attachEvents() {
        // this.$el.find(this._selectors.renderedSelect).on('close', (evt) => this._onMaterialSelectChange(evt));
    }

    render(isInit) {
        this.config.options = this.collection.getSelectOptions();
        this.config.disabled = isInit ? this.config.disabled : false;

        super.render(MaterializeSelectViewTpl, this.config);
        this.$el.find(this._selectors.select).material_select();
        this.attachEvents();
    }

    _onMaterialSelectChange() {}

    _emitChangeEvent(newVal) {
        console.log('changerino')
    }
}