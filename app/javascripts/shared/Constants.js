export default {
    SELECTORS: {
        MAIN_VIEW: '.main-view',
        NAV_VIEW: '.nav-view',
        CREATE_APPOINTMENT_VIEW: '.create-appointment-view',
        CAPTURE_PATIENT_VIEW: '.capture-patient-view',
        CAPTURE_DOCTOR_VIEW: '.capture-doctor-view',
        TYPEAHEAD_VIEW: '.typeahead-view',
        TYPEAHEAD_INPUT: '.typeahead-input'
    },

    // Universal classes only!
    CLASSES: {
        ACTIVE: 'active',
        VALID: 'valid'
    },

    EVENTS: {
        NAVIGATE: {
            TO: 'naviate:to',
            NEW_APPOINTMENT: 'navigate:newAppointment'
        },
        TYPEAHEAD: {
            ITEM_SELECTED: (id) => `typeahead-${id}:itemSelected`
        }
    },

    URLS: {
        SEARCH_PATIENT: '/api/patients?query=$'
    },

    TYPEAHEAD_IDS: {
        PATIENTS: 'patients',
        DOCTORS: 'doctors',
    }
}