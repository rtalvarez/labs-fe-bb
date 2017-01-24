import BaseView from 'javascripts/shared/BaseView';
import CapturePatientViewTpl from 'templates/appointments/create/CapturePatientView';

import DatepickerView from 'javascripts/shared/DatepickerView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';

import PatientCollection from 'javascripts/appointments/create/PatientCollection';
import PatientModel from 'javascripts/appointments/create/PatientModel';

export default class CapturePatientView extends BaseView() {
    initialize(config) {
        super.initialize();
        this.render(CapturePatientViewTpl);
        this._appointmentModel = config.appointmentModel;

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
        const patient = this._selectedPatient;
        let hasErrors = false;

        _.each(this._inputs, (selector, inputName) => {
            if (_.isUndefined(patient.get(inputName))) {
                this.$el.find(selector).addClass(this.CONSTANTS.CLASSES.INVALID);
                hasErrors = true;
            }
        });

        debugger;
        this.setAppointmentData();
        return hasErrors;
    }

    setAppointmentData() {
        this._appointmentModel.set('patient', this._selectedPatient);
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
        this.bindToModel(this.$el.find(this._selectors.captureFirstName), '_selectedPatient', 'firstName', this.onFirstOrLastNameChange);
        this.bindToModel(this.$el.find(this._selectors.captureLastName), '_selectedPatient', 'lastName', this.onFirstOrLastNameChange);
    }

    onFirstOrLastNameChange() {
        this._selectedPatient.unset('id');
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
        this._selectedPatient.set('dateOfBirth', selectedDate);

        this.$el.find(this._selectors.captureDoB)
            .addClass(this.CONSTANTS.CLASSES.VALID)
            .removeClass(this.CONSTANTS.CLASSES.INVALID);
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

        this._datepickerView.setDate(patient.get('dateOfBirth'));

        _.each(this._labels, (value) => {
            this.$el
                .find(value)
                .addClass(classes.ACTIVE);
        });
    }
}