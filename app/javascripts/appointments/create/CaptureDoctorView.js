import BaseView from 'javascripts/shared/BaseView';
import CaptureDoctorViewTpl from 'templates/appointments/create/CaptureDoctorView';

import CONSTANTS from 'javascripts/shared/Constants';
import PubSub from 'javascripts/PubSub';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import DoctorCollection from 'javascripts/appointments/create/DoctorCollection';

export default class extends BaseView() {
    initialize() {
        this.render(CaptureDoctorViewTpl);
        console.log('capture doctor!');

        this.initCollections();
        this.initViews();
        this.attachEvents();
    }

    attachEvents() {
        const typeaheadId = CONSTANTS.TYPEAHEAD_IDS.DOCTORS;

        this.listenTo(PubSub, CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onDoctorsTypeaheadSelect(data));
    }

    initCollections() {
        this._doctorsTypeaheadCollection = new DoctorCollection([]);
    }

    initViews() {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_VIEW),
            collection: this._doctorsTypeaheadCollection,
            id: CONSTANTS.TYPEAHEAD_IDS.DOCTORS,
        });
    }

    _onDoctorsTypeaheadSelect(doctor) {
        console.log('selected', doctor)
    }
}