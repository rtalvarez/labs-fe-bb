import BaseView from 'javascripts/shared/BaseView';
import ContactViewTpl from 'templates/contact/ContactView';

export default class extends BaseView() {
    initialize(config) {
        super.initialize(config);


        this.render(ContactViewTpl);
    }
}
