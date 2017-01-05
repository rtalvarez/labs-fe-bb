/**
 * initialize
 *
 * Application Initializer. Instantiates a new AppView and registers all
 * handlebars custom helpers for use in the app
 */
import AppView from './javascripts/AppView';

$(() => {
    new AppView({
        el: $('.main-container')
    });
    
    console.log('App Loaded');
});
