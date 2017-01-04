/**
 * NavView
 * 
 * This is the view responsible for rendering and maintaining the nav view and its links
 * Also handles expanding and collapsing the sub links when the screen size is small
 * Finally, it also handles scrolling to individual cards when sub links are clicked
 */

var NavView,
    BaseView = require('js/shared/BaseView'),
    Elements = require('constants/Elements'),
    Classnames = require('constants/Classnames');

NavView = BaseView.extend({
  template: require('templates/nav/nav_view'),

  events: {
    'click .nav-book-link': '_onNavBookClick',
    'click .expand-actions': '_onExpandActionsClick',
    'click .collapse-actions': '_onCollapseActionsClick'
  },

  /**
   * Initialize the view. Renders itself and attaches needed listeners
   */
  initialize: function() {
    this.render();
    this.attachListeners();
  },

  /**
   * Attaches the `add` listener incoming from the collection
   * This is necessary to make sure the sub nav links are updated when a book is added
   */
  attachListeners: function() {
    this.listenTo(this.collection, 'add', this.render);
  },

  /**
   * Handler ran when book nav links are clicked
   * Leverages jQuery's animate function to scroll to the corresponding card
   * @param evt {Object} The click event object
   * @private
   */
  _onNavBookClick: function(evt) {
    var bookId = $(evt.target).data('bookid');

    evt.preventDefault();
    this.$el.removeClass(Classnames.expanded);
    $('body').animate({ scrollTop: $('#' + bookId).offset().top - 200 });
  },

  /**
   * Handler that runs when the `hamburger` icon is clicked in the global nav
   * Adds the expanded class to the view's element - hiding and showing the icons
   * is done via CSS on nav_view.scss
   * @private
   */
  _onExpandActionsClick: function() {
    this.$el.addClass(Classnames.expanded);
  },

  /**
   * Handler that runs when the `close` icon is clicked in the global nav
   * Removes the expanded class to the view's element - hiding and showing the icons
   * is done via CSS on nav_view.scss
   * @private
   */
  _onCollapseActionsClick: function() {
    this.$el.removeClass(Classnames.expanded);
  }
});

module.exports = NavView;
