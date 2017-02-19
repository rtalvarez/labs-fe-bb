export default {
    SELECTORS: {
        MAIN_VIEW: '.main-view',
        TYPEAHEAD_VIEW: '.typeahead-view',
        PILLS_TYPEAHEAD_VIEW: '.pills-typeahead-view',
        TYPEAHEAD_INPUT: '.typeahead-input',
        CHIPS: '.chips',
        INPUT: '.input',
        COLLAPSIBLE: '.collapsible'
    },

    BANNER_CLASSES: {
        warning: 'card-panel amber'
    },

    CONEKTA: {
        PUBLIC_KEY: 'key_DzejhJHXeNKsy9BynuoHibw',
    },

    // Universal classes only!
    CLASSES: {
        ACTIVE: 'active',
        VALID: 'valid',
        HIDDEN: 'hidden',
        INVALID: 'invalid'
    },

    EVENTS: {
        DIALOG: {
            CLOSED: 'dialog:closed',
        },
        NAVIGATE: {
            TO: 'naviate:to',
            NEW_APPOINTMENT: 'navigate:newAppointment',
            LOGIN: 'navigate:login',
            VIEW_APPOINTMENT: 'navigate:viewAppointment'
        },
        TYPEAHEAD: {
            ITEM_SELECTED: (id) => `typeahead-${id}:itemSelected`
        },
        DATEPICKER: {
            ITEM_SELECTED: (id) => `datepicker-${id}:itemSelected`
        },
        CHIPS: {
            DELETE: 'chip.delete'
        },
        MATERIAL_SELECT: {
            ITEM_SELECTED: (id) => `materialSelect-${id}:itemSelected`
        },
        CONEKTA: {
            PAYMENT_SUCCESS: 'conekta:paymentSuccess',
            PAYMENT_ERROR: 'conekta:paymentError',
        },
        CREATE_APPOINTMENTS: {
            STEP1_COMPLETE: 'createAppointments-step1:complete',
            STEP1_INCOMPLETE: 'createAppointments-step1:incomplete',
            APPOINTMENT_CREATED: 'createAppointments:created',
            APPOINTMENT_NOT_CREATED: 'createAppointments:notCreated'
        }
    },

    URLS: {
        SEARCH_PATIENT: '/api/patients?query=$',
        APPOINTMENT: (id) => `/appointments/${id}`,
        LOGIN: '/login'
    },

    MATERIAL_SELECT_IDS: {
        APPOINTMENT_TIME: 'appointmentTime'
    },

    TYPEAHEAD_IDS: {
        PATIENTS: 'patients',
        DOCTORS: 'doctors',
        STUDIES: 'studies'
    },

    DATEPICKER_IDS: {
        PATIENTS: 'patients',
        APPOINTMENT_DATE: 'appointmentDate'
    }
}