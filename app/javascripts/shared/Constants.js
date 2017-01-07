export default {
    SELECTORS: {
        MAIN_VIEW: '.main-view',
        NAV_VIEW: '.nav-view',
        CREATE_APPOINTMENT_VIEW: '.create-appointment-view',
        CAPTURE_PATIENT_VIEW: '.capture-patient-view',
        TYPEAHEAD_VIEW: '.typeahead-view'
    },

    EVENTS: {
        NAVIGATE: {
            TO: 'naviate:to',
            NEW_APPOINTMENT: 'navigate:newAppointment'
        }
    },

    URLS: {
        SEARCH_PATIENT: '/api/patients?query=$'
    }
}