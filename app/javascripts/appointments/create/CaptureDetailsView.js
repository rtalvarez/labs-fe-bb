import BaseView from 'javascripts/shared/BaseView';
import CaptureDetailsViewTpl from 'templates/appointments/create/CaptureDetailsView';

import PillsTypeaheadView from 'javascripts/shared/PillsTypeaheadView';
import AppointmentCollection from 'javascripts/appointments/create/AppointmentCollection';
import StudyCollection from 'javascripts/appointments/create/StudyCollection';
import DatepickerView from 'javascripts/shared/DatepickerView';
import MaterializeSelectView from 'javascripts/shared/MaterializeSelectView';

export default class extends BaseView() {
    initialize() {
        this.render(CaptureDetailsViewTpl);
        super.initialize();
        this._selectedStudies = {};

        this._selectors = {
            selectTime: '.capture-details-select-time',
            selectDate: '#capture-details-select-date',
        };

        this._copy = {
            labelSelect: 'Selecciona una hora'
        };

        this.initCollections();
        this.initViews();
        this.attachEvents();
    }

    attachEvents() {
        const constants = this.CONSTANTS;
        const typeaheadId = constants.TYPEAHEAD_IDS.STUDIES;
        const datepickerId = constants.DATEPICKER_IDS.APPOINTMENT_DATE;
        const materialSelectId = constants.MATERIAL_SELECT_IDS.APPOINTMENT_TIME;

        this.listenTo(this.PubSub, constants.EVENTS.TYPEAHEAD.ITEM_SELECTED(typeaheadId), (data) => this._onStudiesTypeaheadSelect(data));
        this.listenTo(this.PubSub, constants.EVENTS.CHIPS.DELETE, (data) => this._onDeleteStudy(data));
        this.listenTo(this.PubSub, constants.EVENTS.DATEPICKER.ITEM_SELECTED(datepickerId), (data) => this._onAppointmentDateSelect(data));
        this.listenTo(this.PubSub, constants.EVENTS.MATERIAL_SELECT.ITEM_SELECTED(materialSelectId), (data) => this._onAppointmentTimeSelect(data));
    }

    _onAppointmentTimeSelect(time) {
        this._selectedAppointment = this._appointmentsCollection.where({ epochTime: +time });
        console.log(this._selectedAppointment);
    }

    _onAppointmentDateSelect(date) {
        console.log('select', date);

        this._appointmentsCollection.fetchAvailableAppointmentHours(date)
            .then(() => this._populateAvailableTimes())
            .then(() => console.log('apps', this._appointmentsCollection));
    }

    _populateAvailableTimes() {
        this._timeSelect.render();
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
        this._appointmentsCollection = new AppointmentCollection([]);
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

        this._timeSelect = new MaterializeSelectView({
            el: this.$el.find(this._selectors.selectTime),
            selectLabel: this._copy.labelSelect,
            collection: this._appointmentsCollection,
            disabled: true,
            id: this.CONSTANTS.MATERIAL_SELECT_IDS.APPOINTMENT_TIME
        });

        // this.$el.find(this._selectors.selectTime).material_select();
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