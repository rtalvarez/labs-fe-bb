/**
 * FeedItemView
 *
 * This is the card view for items in the feed (the list elements inside the feed <ul>)
 * It manages all interactions that happen in the card, like reviewing a book or clicking
 * on any of the actions that are available in the card
 * 
 * For now, all it does is making sure the rating interactions work, and showing/hiding
 * the rate menu. However we could add more things here, like removing the book,
 * renaming author or name, etc.
 */

var BaseView = require('js/shared/BaseView'),
    Constants = require('constants/Constants'),
    Elements = require('constants/Elements'),
    Classnames = require('constants/Classnames'),
    FeedItemView;

FeedItemView = BaseView.extend({
  tagName: 'li',
  events: {
    'click .review-book': '_onReviewBookClick',
    'mouseleave .book-actions': '_onBookMouseleave',
    'click .star': '_onStarIconClick'
  },

  /**
   * Classname function override for backbone's element creating
   * Since the className for each view is dynamic, we need to define this function
   * Backbone will execute this function when creating the <li>s
   * @returns {string} The classname that will be applied to the new element
   */
  className: function() {
    return 'feed-item ' + this.model.get('type')
  },

  /**
   * Initialize function. Renders the element
   */
  initialize: function() {
    // Grabs the corresponding feedItemTemplate depending on the model's type
    this.template = require(Constants.feedItemTemplates[this.model.get('type')]);
    this.render();
  },

  /**
   * Handler for click events on the Review button in the cards
   * It adds the `active` class to the book, and the stars are shown with CSS
   * See feed_item_view.scss for more information
   * @private
   */
  _onReviewBookClick: function() {
    this.$el.addClass(Classnames.active);
  },

  /**
   * When users hover away from the review section, we'll hide back the menu
   * @private
   */
  _onBookMouseleave: function() {
    this.$el.removeClass(Classnames.active);
  },

  /**
   * When users click on stars to rate a book, we'll add a `selected` class to the star
   * that was clicked, and save the rating into the model.
   * (The rating is never read from the model in this app, but it would be needed for
   * backend integration)
   * @param evt {Object} The click event that ocurred in the star
   * @private
   */
  _onStarIconClick: function(evt) {
    var $star = $(evt.target).closest(Elements.star),
        rating = $star.data('value');

    this.$el.find(Elements.star).removeClass(Classnames.selected);
    $star.addClass(Classnames.selected);
    this.model.set('rating', rating);
  }
});

module.exports = FeedItemView;