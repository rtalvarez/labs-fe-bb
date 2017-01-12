import BaseView from 'javascripts/shared/BaseView';
import CapturePatientViewTpl from 'templates/appointments/create/CapturePatientView';

import DatepickerView from 'javascripts/shared/DatepickerView';
import TypeaheadView from 'javascripts/shared/TypeaheadView';
import CONSTANTS from 'javascripts/shared/Constants';

import PatientCollection from 'javascripts/appointments/create/PatientCollection';
import PubSub from 'javascripts/PubSub';

export default class CapturePatientView extends BaseView() {
    initialize() {
        this.render(CapturePatientViewTpl);

        this._selectors = {
            captureDoB: '#capturePatient-DoB',
            captureFirstName: '#capturePatient-firstName',
            captureLastName: '#capturePatient-lastName',
            captureDoBLabel: '#capturePatient-DoB + label',
            captureFirstNameLabel: '#capturePatient-firstName + label',
            captureLastNameLabel: '#capturePatient-lastName + label'
        };

        this.initCollections();
        this.initViews();
        this.attachEvents();
        this.setInputData();
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
        const typeaheadId = CONSTANTS.TYPEAHEAD_IDS.PATIENTS;

        this.listenTo(PubSub, CONSTANTS.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onPatientsTypeaheadSelect(data));
    }

    initCollections() {
        this._patientsTypeaheadCollection = new PatientCollection([]);
    }

    initViews() {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_VIEW),
            url: CONSTANTS.URLS.SEARCH_PATIENT,
            collection: this._patientsTypeaheadCollection,
            id: CONSTANTS.TYPEAHEAD_IDS.PATIENTS,
        });

        this._datepickerView = new DatepickerView({
            el: this.$el.find(this._selectors.captureDoB)
        });
    }

    _onPatientsTypeaheadSelect(data) {
        const selectedPatient = this._patientsTypeaheadCollection.get(data.selectedItemId);

        console.log('patient', selectedPatient);
        this._fillInputs(selectedPatient);
    }

    _fillInputs(patient) {
        const classes = CONSTANTS.CLASSES;

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