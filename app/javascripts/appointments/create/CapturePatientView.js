import BaseView from 'javascripts/shared/BaseView';
import CapturePatientViewTpl from 'templates/appointments/create/CapturePatientView';

import TypeaheadView from 'javascripts/shared/TypeaheadView';
import CONSTANTS from 'javascripts/shared/Constants';

import PatientCollection from 'javascripts/appointments/create/PatientCollection';

export default class CapturePatientView extends BaseView() {
    initialize() {
        this.render(CapturePatientViewTpl);

        this.initViews();
    }

    initViews() {
        this._typeaheadView = new TypeaheadView({
            el: this.$el.find(CONSTANTS.SELECTORS.TYPEAHEAD_VIEW),
            url: CONSTANTS.URLS.SEARCH_PATIENT,
            collection: new PatientCollection([])
        });
    }
}