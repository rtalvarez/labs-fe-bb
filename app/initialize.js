/**
 * initialize
 *
 * Application Initializer. Instantiates a new AppView and registers all
 * handlebars custom helpers for use in the app
 */
import AppView from 'javascripts/AppView';
import CONSTANTS from 'javascripts/shared/Constants';

import CollapsibleHeaderPanel from 'templates/appointments/create/CollapsibleHeaderPanel';

$(() => {
    window.Conekta.setPublicKey(CONSTANTS.CONEKTA.PUBLIC_KEY);

    // This is suboptimal. TODO refactor
    Handlebars.registerPartial('CollapsibleHeaderPanel',  CollapsibleHeaderPanel);
    Handlebars.registerHelper('bannerType', (type) => CONSTANTS.BANNER_CLASSES[type]);
    Handlebars.registerHelper('log', (context) => console.log(context));

    new AppView({
        el: $(CONSTANTS.SELECTORS.MAIN_VIEW)
    });
    
    console.log('App Loaded');
});
