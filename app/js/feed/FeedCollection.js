/**
 * FeedCollection
 *
 * This is the Backbone collection for all feed items. Can be books or articles
 * The job of this collection is to make sure the collection is up to date
 * with any books that users might add via AddBookDialogView
 *
 * In a real application, the collection would also be responsible for keeping
 * the collection in sync with the backend services
 */

var FeedItemModel = require('js/feed/FeedItemModel'),
    Constants = require('constants/Constants'),
    PubSub = require('js/shared/PubSub'),
    FeedCollection;

FeedCollection = Backbone.Collection.extend({
  model: FeedItemModel,

  /**
   * Initialize function. Attaches the listeners needed for the collection
   */
  initialize: function() {
    this.attachListeners();
  },

  /**
   * The collection listens for the SUBMITTED_BOOK_FORM event
   */
  attachListeners: function() {
    this.listenTo(PubSub, Constants.events.SUBMITTED_BOOK_FORM, this._onAddBookFormSubmit);
  },

  /**
   * Handler for the SUBMITTED_BOOK_FORM event on the PubSub object.
   * This method parses the formData entered by the user and creates a new FeedItemModel
   * When the book is added, the `add` event that is automatically triggered will
   * be catched by the collection view, and a new FeedItemView will be rendered
   * @param formData {Array} The serialized array that was retrieved from the form submit event
   * @private
   */
  _onAddBookFormSubmit: function(formData) {
    var feedItemData = _.reduce(formData, function(memo, item) {
      memo[item.name] = item.value;
      return memo;
    },  {});

    this.add(new FeedItemModel(feedItemData));
  },

  /**
   * Override implementation for backbone's fetch service
   * In a real application, this method would be getting data from a backend service
   * to initialize the collection of feed items
   * @returns {Object} Promise for the json mock data
   */
  fetch: function() {
    return $.get(Constants.MOCK_DATA_URL);
  }

});

module.exports = FeedCollection;