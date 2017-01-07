import BaseView from 'javascripts/shared/BaseView';
import TypeaheadViewTpl from 'templates/shared/TypeaheadView';
import TypeaheadModel from 'javascripts/shared/TypeaheadModel';

export default class TypeaheadView extends BaseView({
    model: new TypeaheadModel(),
    events: {
        'input .typeahead-input': '_onTypeaheadInputChange'
    }
}) {
    initialize(data) {
        console.log('Typeahead view initialized');

        this.render(TypeaheadViewTpl);
        console.log(data);
        console.log('model', this.model);
        // this.test();
    }

    test() {
        const data = {
            Google: { id: 1 },
            Apple: { id: 2 }
        };

        this.$el.find('.typeahead-input').autocomplete({ data });
    }

    _onTypeaheadInputChange(evt) {
        evt.preventDefault();

        console.log($(evt.target).val());
        this.fetchTypeaheadData();
    }

    fetchTypeaheadData() {
        this.model.fetchData();
    }
}