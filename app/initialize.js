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

    window.onSignIn = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    // This is suboptimal. TODO refactor
    Handlebars.registerPartial('CollapsibleHeaderPanel',  CollapsibleHeaderPanel);
    Handlebars.registerHelper('bannerType', (type) => CONSTANTS.BANNER_CLASSES[type]);

    new AppView({
        el: $(CONSTANTS.SELECTORS.MAIN_VIEW)
    });
    
    console.log('App Loaded');
});
