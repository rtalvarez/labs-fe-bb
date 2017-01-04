/**
 * FeedItemModel
 *
 * This is the backbone model for all feed items. Can be books or articles
 * These will be the individual items that the FeedCollection will be made out of
 * These models will have all the data that the views need to render the feed,
 * and is the skeleton of what information the view contains
 * It's job is to be the source of truth for the information that the feed views display
 *
 * It looks empty, but as the app scales, more model functionality would be added here
 * (eg updating a model, syncing it with backend, etc)
 */

var FeedItemModel,
    Constants = require('constants/Constants');

FeedItemModel = Backbone.Model.extend({
  /**
   * Initialization function
   * It defaults back a few properties if they are not specified in the json model
   * @param jsonModel {Object} A vanilla JS object with the information to copy into the model
   */
  initialize: function(jsonModel) {
    var type = jsonModel.type || 'book',
        coverUrl = jsonModel.coverUrl || Constants.PLACEHOLDER_IMG_URL,
        resourceUrl = jsonModel.resourceUrl || Constants.DEFAULT_RESOURCE_URL;

    if (type === 'book') {
      coverUrl = Constants.BOOK_PLACEHOLDER_IMG_URL;
    } else {
      coverUrl = Constants.ARTICLE_PLACEHOLDER_IMG_URL;
    }

    this.set('coverUrl', coverUrl);
    this.set('type', type);
    this.set('resourceUrl', resourceUrl);

    // In a real application, I wouldn't need this because models
    // would be assigned IDs from the server after being created.
    // But I'm assigning temp ids to newly created models because I won't be syncing with a server
    // `cid` is a temporary ID assigned by backbone, so just leveraging that here
    if (!this.get('id')) {
      this.set('id', this.cid);
    }
  }
});

module.exports = FeedItemModel;