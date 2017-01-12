import BaseView from 'javascripts/shared/BaseView';
import CaptureDoctorViewTpl from 'templates/appointments/create/CaptureDoctorView';

import TypeaheadView from 'javascripts/shared/TypeaheadView';

import DoctorCollection from 'javascripts/appointments/create/DoctorCollection';

export default class extends BaseView() {
    initialize() {
        super.initialize();
        this.render(CaptureDoctorViewTpl);

        this._selectors = {
            captureFirstName: '#captureDoctor-firstName',
            captureLastName: '#captureDoctor-lastName',
            captureFirstNameLabel: '#captureDoctor-firstName + label',
            captureLastNameLabel: '#captureDoctor-lastName + label'
        };

        this.initCollections();
        this.initViews();
        this.attachEvents();
        this.setInputData();
    }

    setInputData() {
        const selectors = this._selectors;

        this._inputs = {
            firstName: selectors.captureFirstName,
            lastName: selectors.captureLastName,
        };

        this._labels = {
            firstName: selectors.captureFirstNameLabel,
            lastName: selectors.captureLastNameLabel
        };
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

    _onDoctorsTypeaheadSelect(data) {
        const selectedDoctor = this._doctorsTypeaheadCollection.get(data.selectedItemId);

        this._fillInputs(selectedDoctor);
    }

    _fillInputs(doctor) {
        const classes = this.CONSTANTS.CLASSES;

        _.each(this._inputs, (value, key) => {
            this.$el
                .find(value)
                .val(doctor.get(key))
                .addClass(classes.VALID);
        });

        _.each(this._labels, (value) => {
            this.$el
                .find(value)
                .addClass(classes.ACTIVE);
        });
    }
}