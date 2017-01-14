export default {
    SELECTORS: {
        MAIN_VIEW: '.main-view',
        NAV_VIEW: '.nav-view',
        CREATE_APPOINTMENT_VIEW: '.create-appointment-view',
        CAPTURE_PATIENT_VIEW: '.capture-patient-view',
        CAPTURE_DOCTOR_VIEW: '.capture-doctor-view',
        CAPTURE_DETAILS_VIEW: '.capture-details-view',
        TYPEAHEAD_VIEW: '.typeahead-view',
        PILLS_TYPEAHEAD_VIEW: '.pills-typeahead-view',
        TYPEAHEAD_INPUT: '.typeahead-input',
        CHIPS: '.chips',
        INPUT: '.input'
    },

    // Universal classes only!
    CLASSES: {
        ACTIVE: 'active',
        VALID: 'valid',
        HIDDEN: 'hidden'
    },

    EVENTS: {
        NAVIGATE: {
            TO: 'naviate:to',
            NEW_APPOINTMENT: 'navigate:newAppointment'
        },
        TYPEAHEAD: {
            ITEM_SELECTED: (id) => `typeahead-${id}:itemSelected`
        },
        DATEPICKER: {
            ITEM_SELECTED: (id) => `datepicker-${id}:itemSelected`
        }
    },

    URLS: {
        SEARCH_PATIENT: '/api/patients?query=$'
    },

    TYPEAHEAD_IDS: {
        PATIENTS: 'patients',
        DOCTORS: 'doctors',
        STUDIES: 'studies'
    },

    DATEPICKER_IDS: {
        PATIENTS: 'patients'
    }
}