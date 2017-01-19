import BaseView from 'javascripts/shared/BaseView';
import CaptureDetailsViewTpl from 'templates/appointments/create/CaptureDetailsView';

import PillsTypeaheadView from 'javascripts/shared/PillsTypeaheadView';
import StudyCollection from 'javascripts/appointments/create/StudyCollection';
import DatepickerView from 'javascripts/shared/DatepickerView';

export default class extends BaseView() {
    initialize() {
        this.render(CaptureDetailsViewTpl);
        super.initialize();
        this._selectedStudies = {};

        this._selectors = {
            selectTime: '#capture-details-select-time',
            selectDate: '#capture-details-select-date'
        };

        this.initCollections();
        this.initViews();
        this.attachEvents();
    }

    attachEvents() {
        const constants = this.CONSTANTS;
        const typeaheadId = constants.TYPEAHEAD_IDS.STUDIES;
        const datepickerId = constants.DATEPICKER_IDS.APPOINTMENT_DATE;

        this.listenTo(this.PubSub, constants.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onStudiesTypeaheadSelect(data));
        this.listenTo(this.PubSub, constants.EVENTS.CHIPS.DELETE, (data) => this._onDeleteStudy(data));
        this.listenTo(this.PubSub, constants.EVENTS.DATEPICKER.ITEM_SELECTED(datepickerId), (data) => this._onAppointmentDateSelect(data));
    }

    _onAppointmentDateSelect(data) {
        debugger;
        console.log('select', data);
    }

    _onDeleteStudy(data) {
        const deletedStudy = data.entity;

        delete this._selectedStudies[deletedStudy.get('id')];
    }

    checkForErrors() {
        const constants = this.CONSTANTS;
        const hasErrors = _.isEmpty(this._selectedStudies);

        if (hasErrors) {
            this.$el.find(constants.SELECTORS.TYPEAHEAD_INPUT)
                .addClass(constants.CLASSES.INVALID);
        }

        return hasErrors;
    }

    initCollections() {
        this._studiesTypeaheadCollection = new StudyCollection([]);
    }

    initViews() {
        this._pillsTypeahead = new PillsTypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.PILLS_TYPEAHEAD_VIEW),
            collection: this._studiesTypeaheadCollection,
            id: this.CONSTANTS.TYPEAHEAD_IDS.STUDIES,
        });

        this._datepickerView = new DatepickerView({
            el: this.$el.find(this._selectors.selectDate),
            id: this.CONSTANTS.DATEPICKER_IDS.APPOINTMENT_DATE
        });

        this.$el.find(this._selectors.selectTime).material_select();
    }

    _onStudiesTypeaheadSelect(data) {
        const id = data.selectedItemId;
        const selectedStudy = this._studiesTypeaheadCollection.get(id);
        const constants = this.CONSTANTS;

        this._selectedStudies[id] = selectedStudy;
        this.$el.find(constants.SELECTORS.TYPEAHEAD_INPUT)
            .addClass(constants.CLASSES.VALID)
            .removeClass(constants.CLASSES.INVALID);
    }
}