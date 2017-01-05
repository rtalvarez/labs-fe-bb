/**
 * initialize
 *
 * Application Initializer. Instantiates a new AppView and registers all
 * handlebars custom helpers for use in the app
 */
import AppView from 'javascripts/AppView';
import CONSTANTS from 'javascripts/shared/Constants';

$(() => {
    new AppView({
        el: $(CONSTANTS.SELECTORS.MAIN_VIEW)
    });
    
    console.log('App Loaded');
});
