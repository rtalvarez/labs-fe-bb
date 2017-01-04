/**
 * FeedCollectionView
 *
 * This view is responsible for managing all of the feed items
 * Basically, it's job is to translate the FeedCollection into individual FeedItemViews
 * So, it corresponds to the view of the whole feed, and is responsible for initializing
 * all the individual views, and any other items that live in the feed (like the welcome card)
 *
 */

var BaseView = require('js/shared/BaseView'),
    FeedItemView = require('js/feed/FeedItemView'),
    WelcomeBackView = require('js/feed/WelcomeBackView'),
    PubSub = require('js/shared/PubSub'),
    Constants = require('constants/Constants'),
    Classnames = require('constants/Classnames'),
    FeedCollectionView;

FeedCollectionView = BaseView.extend({

  /**
   * Initialize function. Kicks off the feed bootstrapping
   * Also attaches all needed listeners
   */
  initialize: function() {
    // We will keep track of all the sub views in a `views` hash
    // Although unused here, it's a good practice, to make sure we can always
    // properly destroy all sub views and unbind events to make sure our app
    // has no zombies
    this.views = {};
    this.initFeedItems();
    this.attachListeners();
  },

  /**
   * Initializes all the feed items.
   * It also initializes the Welcome back card that shows on top of the feed.
   * Lastly, it will make a new FeedItemView for each item in the FeedCollection
   */
  initFeedItems: function() {
    var welcomeBackView = this.views.welcome = new WelcomeBackView({
      collection: this.collection
    });

    // All individual subviews are rendered in the feed by appending their elements
    // into the main feed item list
    this.$el.append(welcomeBackView.el);
    this.collection.each(this._createBookSubView, this);
  },

  /**
   * Attaches all needed listeners
   * In this case, the collection view will listen for backbone 'add' events
   * (Note: the `add` string is not in the Constants.events hash
   * because it's a backbone event not a custom one. We can never rename this event name
   * so having its name in the Constants does not provide any benefits).
   *
   * This function will create new sub views for any new items that are added to the collection
   */
  attachListeners: function() {
    this.listenTo(this.collection, 'add', this._createBookSubView);
    this.listenTo(PubSub, Constants.events.TOGGLED_DIALOG, this._onDialogToggle);
  },

  /**
   * In order to get around a chrome bug regarding columns.
   * If overflow: hidden is not present on the column-containing element,
   * chrome renders a bunch of white space at the end of the page
   * However, overflow: hidden will block the add books dialog's bottom
   * content, so we need to disable it if the dialog is open.
   * @param isOpen {Boolean} Whether the dialog is open or not
   * @private
   */
  _onDialogToggle: function(isOpen) {
    this.$el.toggleClass(Classnames.inactive, isOpen)
  },

  /**
   * Method responsible for creating a FeedItemView out of a FeedItemModel
   * @param feedItemModel {FeedItemModel} The model instance to create a new view for
   * @private
   */
  _createBookSubView: function(feedItemModel) {
    var view = this.views[feedItemModel.get('id')] = new FeedItemView({
      model: feedItemModel
    });

    this.$el.append(view.el);
  }
});

module.exports = FeedCollectionView;