import BaseView from 'javascripts/shared/BaseView';
import CapturePatientViewTpl from 'templates/appointments/create/CapturePatientView';

import DatepickerView from 'javascripts/shared/DatepickerView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import PatientCollection from 'javascripts/appointments/create/PatientCollection';
import PatientModel from 'javascripts/appointments/create/PatientModel';

export default class CapturePatientView extends BaseView() {
    initialize() {
        super.initialize();
        this.render(CapturePatientViewTpl);

        this._selectors = {
            captureDoB: '#capturePatient-DoB',
            captureFirstName: '#capturePatient-firstName',
            captureLastName: '#capturePatient-lastName',
            captureDoBLabel: '#capturePatient-DoB + label',
            captureFirstNameLabel: '#capturePatient-firstName + label',
            captureLastNameLabel: '#capturePatient-lastName + label'
        };

        _.bindAll(this,
            'checkForErrors');

        this.initModels();
        this.initCollections();
        this.initViews();

        this.attachEvents();
        this.setInputData();
    }

    initModels() {
        this._selectedPatient = new PatientModel({});
    }

    checkForErrors() {

        console.log('dob', this._selectedPatient.get('dateOfBirth'))
    }

    setInputData() {
        const selectors = this._selectors;

        this._inputs = {
            dateOfBirth: selectors.captureDoB,
            firstName: selectors.captureFirstName,
            lastName: selectors.captureLastName,
        };

        this._labels = {
            dateOfBirth: selectors.captureDoBLabel,
            firstName: selectors.captureFirstNameLabel,
            lastName: selectors.captureLastNameLabel
        };
    }

    attachEvents() {
        const typeaheadId = this.CONSTANTS.TYPEAHEAD_IDS.PATIENTS;
        const datepickerId = this.CONSTANTS.DATEPICKER_IDS.PATIENTS;

        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onPatientsTypeaheadSelect(data));
        this.listenTo(this.PubSub, this.CONSTANTS.EVENTS.DATEPICKER.ITEM_SELECTED(datepickerId), (data) => this._onPatientsDatepickerSelect(data));
        this.bindToModel(this.$el.find(this._selectors.captureFirstName), this._selectedPatient, 'firstName');
        this.bindToModel(this.$el.find(this._selectors.captureLastName), this._selectedPatient, 'lastName');
    }

    initCollections() {
        this._patientsTypeaheadCollection = new PatientCollection([]);
    }

    initViews() {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.TYPEAHEAD_VIEW),
            collection: this._patientsTypeaheadCollection,
            id: this.CONSTANTS.TYPEAHEAD_IDS.PATIENTS,
        });

        this._datepickerView = new DatepickerView({
            el: this.$el.find(this._selectors.captureDoB),
            id: this.CONSTANTS.DATEPICKER_IDS.PATIENTS
        });
    }

    _onPatientsDatepickerSelect(selectedDate) {
        console.log('selectedDate', selectedDate);
    }

    _onPatientsTypeaheadSelect(data) {
        const selectedPatient = this._patientsTypeaheadCollection.get(data.selectedItemId);

        this._selectedPatient = selectedPatient;
        this._fillInputs(selectedPatient);
    }

    _fillInputs(patient) {
        const classes = this.CONSTANTS.CLASSES;

        _.each(this._inputs, (value, key) => {
            this.$el
                .find(value)
                .val(patient.get(key))
                .addClass(classes.VALID);
        });

        // Special treatment for datepicker, since processing of date needs to be made
        this._datepickerView.setDate(patient.get('dateOfBirth'));

        _.each(this._labels, (value) => {
            this.$el
                .find(value)
                .addClass(classes.ACTIVE);
        });
    }
}