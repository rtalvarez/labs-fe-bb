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
            captureDoB: '#capturePatient-DoB'
        };

        this.initCollections();
        this.initViews();
        this.attachEvents();
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
    }
}