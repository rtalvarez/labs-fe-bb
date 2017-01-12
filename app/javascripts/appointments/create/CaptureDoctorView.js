import BaseView from 'javascripts/shared/BaseView';
import CaptureDoctorViewTpl from 'templates/appointments/create/CaptureDoctorView';

import TypeaheadView from 'javascripts/shared/TypeaheadView';

import DoctorCollection from 'javascripts/appointments/create/DoctorCollection';

export default class extends BaseView() {
    initialize() {
        super.initialize();
        this.render(CaptureDoctorViewTpl);

        this.initCollections();
        this.initViews();
        this.attachEvents();
    }

    attachEvents() {
        const typeaheadId = this.CONSTANTS.TYPEAHEAD_IDS.DOCTORS;

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onDoctorsTypeaheadSelect(data));
    }

    initCollections() {
        this._doctorsTypeaheadCollection = new DoctorCollection([]);
    }

    initViews() {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.TYPEAHEAD_VIEW),
            collection: this._doctorsTypeaheadCollection,
            id: this.CONSTANTS.TYPEAHEAD_IDS.DOCTORS,
        });
    }

    _onDoctorsTypeaheadSelect(doctor) {
        console.log('selected', doctor)
    }
}