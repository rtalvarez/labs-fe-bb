import BaseView from 'javascripts/shared/BaseView';
import TypeaheadViewTpl from 'templates/shared/TypeaheadView';

export default class TypeaheadView extends BaseView() {
    initialize(data) {
        console.log('Typeahead view initialized');

        this.render(TypeaheadViewTpl);
        console.log(data);
    }
}