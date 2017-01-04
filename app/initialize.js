/**
 * initialize
 *
 * Application Initializer. Instantiates a new AppView and registers all
 * handlebars custom helpers for use in the app
 */
import NavCtrl from './javascripts/nav/nav.controller';


// $(function() {
//   var app = new AppView({
//     el: $(Elements.mainContainer)
//   });
// });

$(() => {
  const ctrl = new NavCtrl();

  console.log('loaded', ctrl);
});
