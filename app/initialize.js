/**
 * initialize
 *
 * Application Initializer. Instantiates a new AppView and registers all
 * handlebars custom helpers for use in the app
 */


$(function() {
  var AppView  = require('js/AppView'),
      icons = require('constants/Constants').icons,
      Elements = require('constants/Elements');

  // This helper will be used throughout the hbs templates to insert SVG icons
  // into the template.
  // Define your icon in Constants.js and use it like so:
  // Definition in Icons in Constants.js: 'star' : 'templates/icons/ic_star_24pv.svg'
  // Usage in HBS template: {{include-icon 'star'}}
  Handlebars.registerHelper('include-icon', function(iconName) {
    // Since the icon does not contain any user generated input,
    // It is XSS safe to unescape all markup.
    return new Handlebars.SafeString(require(icons[iconName])());
  });

  var app = new AppView({
    el: $(Elements.mainContainer)
  });
});
