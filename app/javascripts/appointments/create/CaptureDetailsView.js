import BaseView from 'javascripts/shared/BaseView';
import CaptureDetailsViewTpl from 'templates/appointments/create/CaptureDetailsView';

import PillsTypeaheadView from 'javascripts/shared/PillsTypeaheadView';
import AppointmentCollection from 'javascripts/shared/AppointmentCollection';
import AppointmentModel from 'javascripts/shared/AppointmentModel';
import StudyCollection from 'javascripts/appointments/create/StudyCollection';
import DatepickerView from 'javascripts/shared/DatepickerView';
import MaterializeSelectView from 'javascripts/shared/MaterializeSelectView';

export default class extends BaseView() {
    initialize(config) {
        this.render(CaptureDetailsViewTpl);
        super.initialize();
        this._selectedStudies = {};
        this._appointmentModel = config.appointmentModel;

        this._selectors = {
            selectTime: '.capture-details-select-time',
            selectDate: '#capture-details-select-date',
            notes: '#capture-details-notes',
            selectDropdown: '.select-dropdown'
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

        this.bindToModel(this.$el.find(this._selectors.notes), '_selectedAppointment', 'notes');
    }

    _onAppointmentTimeSelect(time) {
        const notes = this._selectedAppointment.get('notes');
        const date = new Date(+time);
        this.$find('selectTime').addClass(this.CONSTANTS.CLASSES.VALID);
        this._selectedTime = time;

        this._selectedAppointment = this._appointmentsCollection.findWhere({ epochTime: +time });
        this._selectedAppointment.set({
            notes,
            date,
        });
    }

    _onAppointmentDateSelect(dateObj) {
        const classes = this.CONSTANTS.CLASSES;

        if (!dateObj) {
            this._selectedAppointment.set('date', '');
            this.$find('selectDate').removeClass(classes.VALID);

            return;
        }

        const date = dateObj.obj;

        this._selectedAppointment.set('date', date);
        this.$find('selectDate')
            .addClass(classes.VALID)
            .removeClass(classes.INVALID);

        this._appointmentsCollection.fetchAvailableAppointmentHours(date.toJSON())
            .then(() => this._populateAvailableTimes());
    }

    _populateAvailableTimes() {
        console.log('col', this._appointmentsCollection)
        this._timeSelect.render();
    }

    _onDeleteStudy(data) {
        const deletedStudy = data.entity;

        delete this._selectedStudies[deletedStudy.get('id')];
    }

    checkForErrors() {
        const constants = this.CONSTANTS;
        const noStudiesSelected = _.isEmpty(this._selectedStudies);
        const noDateSelected = _.isUndefined(this._selectedAppointment.get('date'));
        const noTimeSelected = _.isUndefined(this._selectedTime);
        const hasErrors = noStudiesSelected || noDateSelected || noTimeSelected;

        if (noStudiesSelected) {
            this.$el.find(constants.SELECTORS.TYPEAHEAD_INPUT)
                .addClass(constants.CLASSES.INVALID);
        }

        if (noDateSelected) {
            this.$find('selectDate').addClass(constants.CLASSES.INVALID);
        }

        if (noTimeSelected) {
            this.$find('selectDropdown').addClass(constants.CLASSES.INVALID);
        }

        this.setAppointmentData();
        return hasErrors;
    }

    setAppointmentData() {
        this._appointmentModel.set({
            notes: this._selectedAppointment.get('notes'),
            date: this._selectedAppointment.get('date'),
            studies: _.values(this._selectedStudies),
        });
    }

    initCollections() {
        this._appointmentsCollection = new AppointmentCollection([]);
        this._studiesTypeaheadCollection = new StudyCollection([]);

        this._selectedAppointment = new AppointmentModel({});
    }

    initViews() {
        this._pillsTypeahead = new PillsTypeaheadView({
            el: this.$el.find(this.CONSTANTS.SELECTORS.PILLS_TYPEAHEAD_VIEW),
            collection: this._studiesTypeaheadCollection,
            id: this.CONSTANTS.TYPEAHEAD_IDS.STUDIES,
        });

        this._datepickerView = new DatepickerView({
            el: this.$el.find(this._selectors.selectDate),
            id: this.CONSTANTS.DATEPICKER_IDS.APPOINTMENT_DATE,
            datePickerConfig: {
                min: new Date()
            }
        });

        this._timeSelect = new MaterializeSelectView({
            el: this.$el.find(this._selectors.selectTime),
            selectLabel: this._copy.labelSelect,
            collection: this._appointmentsCollection,
            disabled: true,
            id: this.CONSTANTS.MATERIAL_SELECT_IDS.APPOINTMENT_TIME
        });
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