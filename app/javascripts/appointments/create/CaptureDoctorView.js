import BaseView from 'javascripts/shared/BaseView';
import CaptureDoctorViewTpl from 'templates/appointments/create/CaptureDoctorView';

import TypeaheadView from 'javascripts/shared/TypeaheadView';

import DoctorModel from 'javascripts/appointments/create/DoctorModel';
import DoctorCollection from 'javascripts/appointments/create/DoctorCollection';

export default class extends BaseView() {
    initialize(config) {
        super.initialize();
        this.render(CaptureDoctorViewTpl);
        this._appointmentModel = config.appointmentModel;

        this._selectors = {
            captureFirstName: '#captureDoctor-firstName',
            captureLastName: '#captureDoctor-lastName',
            captureFirstNameLabel: '#captureDoctor-firstName + label',
            captureLastNameLabel: '#captureDoctor-lastName + label'
        };

        this.initModel();
        this.initCollections();
        this.initViews();
        this.attachEvents();
        this.setInputData();
    }

    initModel() {
        this._selectedDoctor = new DoctorModel({});
    }

    checkForErrors() {
        const doctor = this._selectedDoctor;
        let hasErrors = false;

        _.each(this._inputs, (selector, inputName) => {
            if (_.isEmpty(doctor.get(inputName))) {
                this.$el.find(selector).addClass(this.CONSTANTS.CLASSES.INVALID);
                hasErrors = true;
            }
        });

        this.setAppointmentData();
        return hasErrors;
    }

    setAppointmentData() {
        this._appointmentModel.set('doctor', this._selectedDoctor);
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
        this.bindToModel(this.$el.find(this._selectors.captureFirstName), '_selectedDoctor', 'firstName');
        this.bindToModel(this.$el.find(this._selectors.captureLastName), '_selectedDoctor', 'lastName');
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
        this._selectedDoctor = selectedDoctor;

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