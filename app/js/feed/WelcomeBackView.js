/**
 * WelcomeBackView
 *
 * This is the view that corresponds to the welcome back card that is shown on top of the feed
 * It handles opening the add book dialog and dismissing itself if the user clicks `No`
 * This card will live on top of the feed until dismissed
 */

var BaseView = require('js/shared/BaseView'),
    AddBookDialogView = require('js/feed/AddBookDialogView'),
    Constants = require('constants/Constants'),
    Classnames = require('constants/Classnames'),
    WelcomeBackView;

WelcomeBackView = BaseView.extend({
  tagName: 'li',
  className: 'welcome-back-card feed-item',
  template: require('templates/feed/welcome_back'),

  events: {
    'click .dismiss-welcome': '_onDismissWelcomeClick',
    'click .add-book': '_onAddBookClick'
  },

  /**
   * Initialize function. Binds callbacks that need to be bound
   * Also renders itself and initializes sub views
   */
  initialize: function() {
    _.bindAll(this, 'destroy');
    this.views = {};

    this.render();
    this._initSubViews();
  },

  /**
   * Initializes the AddBookDialogView, and appends its `el` to the main card view
   * @private
   */
  _initSubViews: function() {
    this.views.addBook = new AddBookDialogView({
      collection: this.collection
    });

    this.$el.append(this.views.addBook.el);
  },

  /**
   * Handler ran when the card is dismissed.
   * It fades out the element and calls the destroy method after the animation is done
   * @private
   */
  _onDismissWelcomeClick: function() {
    this.$el
        .addClass(Classnames.fading)
        .fadeOut(800, this.destroy);
  },

  /**
   * Function that properly de-bootstraps this view.
   * It removes all DOM events, custom events and removes itself from the DOM
   * It also kills all subviews and makes sure they also remove their events and
   * markup from the page
   * This is necessary in order to keep memory clean
   * This empty view will be kept in memory ready to be re-initialized by the parent
   * (if needed in the future)
   */
  destroy: function() {
    this.stopListening();
    this.$el.remove();

    _.each(this.views, function (view) {
      view.stopListening();
      view.$el.remove();
    });

    this.views = null;
  },

  /**
   * Handler ran when the main CTA (Yes) is clicked
   * It opens the dialog's sub view. All of the events that happen then
   * are delegated to the AddBook view
   * @private
   */
  _onAddBookClick: function() {
    this.views.addBook.open();
  }
});

module.exports = WelcomeBackView;