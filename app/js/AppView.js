/**
 * AppView
 *
 * Main backbone view for the application itself.
 * It bootstraps all sub views, initializes the feed collection and fetches the feed data.
 * No logic here, just meant to be a main parent view that initializes all the components
 * inside the app
 */

var BaseView = require('js/shared/BaseView'),
    Elements = require('constants/Elements'),
    FeedCollection = require('js/feed/FeedCollection'),
    FeedCollectionView = require('js/feed/FeedCollectionView'),
    NavView = require('js/nav/NavView'),
    AppView;

AppView = BaseView.extend({
  template: require('templates/app_view'),

  /**
   * Main initialize function. Will initialize the feed and render itself
   */
  initialize: function() {
    _.bindAll(this,
        '_initializeFeedCollection',
        'initNav');

    this.views = {};
    this.collections = {};

    this.render();
    this.initFeed();
  },

  /**
   * Creates a new, empty feed collection and lazy loads all of the models inside it
   * Since the nav view also needs access to the initialized collection, we chain
   * the fetch promise to make sure the nav is started when the collection has all the
   * feed models
   */
  initFeed: function() {
    var feedCollection = new FeedCollection([]);

    feedCollection
        .fetch()
        .then(this._initializeFeedCollection)
        .then(this.initNav);

    this.collections.feed = feedCollection;
  },

  /**
   * Callback ran when the promise to get feed data succeeds
   * This adds all the models coming back from the backend, and initializes a feed collection view
   * This view will render all individual card views based on the passed in data
   *
   * (In this example app, feedData is just mock JSON data coming from a .json file)
   * @param feedData {Array} Array of feed item models coming from the backend
   * @private
   */
  _initializeFeedCollection: function(feedData) {
    this.collections.feed.add(feedData);
    this.views.collectionView = new FeedCollectionView({
      collection: this.collections.feed,
      el: this.$el.find(Elements.feedItems)
    });
  },

  /**
   * Initializes the nav app component
   */
  initNav: function() {
    this.views.nav = new NavView({
      el: this.$el.find(Elements.homeNav),
      collection: this.collections.feed
    });

    this.trolls();
  },

  trolls: () => {
      console.log('trolls');
    }
});

module.exports = AppView;
