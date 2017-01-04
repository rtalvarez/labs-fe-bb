/**
 * AddBookDialogView
 * This view corresponds to the dialog that pops up that lets users add new books
 * It manages the dialog popup, closes it and opens it.
 * It also captures the form data after users submit the book information, and triggers an
 * event on the PubSub object to let the collection and views be updated
 */

var BaseView = require('js/shared/BaseView'),
    PubSub = require('js/shared/PubSub'),
    Constants = require('constants/Constants'),
    Elements = require('constants/Elements'),
    Classnames = require('constants/Classnames'),
    AddBookDialogView;

AddBookDialogView = BaseView.extend({
  template: require('templates/feed/add_book_dialog'),

  tagName: 'div',
  className: 'dialog hidden',
  events: {
    'click .dialog-mask': 'close',
    'click .close-dialog': 'close',
    'submit .add-book-form': '_onAddBookFormSubmit',
    'change .entry-type-options': '_onEntryTypeOptionsChange'
  },

  /**
   * Initialize function. Renders the view
   */
  initialize: function() {
    this.render()
  },

  /**
   * Opens the dialog by removing the `hidden` class on the dialog element
   * Also focuses the first input in the form, for user convenience
   */
  open: function() {
    this.$el
        .removeClass(Classnames.hidden)
        .find(Elements.bookNameInput)
        .focus();

    PubSub.trigger(Constants.events.TOGGLED_DIALOG, true);
  },

  /**
   * Closes the dialog by putting back the `hidden` class on the dialog element
   * Also makes sure to clear inputs that weren't submitted and any form errors
   */
  close: function() {
    this.$el
        .find(Elements.addBookFormInput)
        .val('');

    this.$el
        .addClass(Classnames.hidden)
        .find(Elements.addBookForm)
        .removeClass(Classnames.hasError);

    PubSub.trigger(Constants.events.TOGGLED_DIALOG, false);
  },

  _onEntryTypeOptionsChange: function(evt) {
    var isDisabled = $(evt.target).val() === 'book';
    this.$el
        .find(Elements.bookDescriptionInput)
        .prop('disabled', isDisabled);
  },

  /**
   * Event handler for book submit events.
   * Grabs the book name and makes sure it's not in use
   * Then it serializes all inputs in the form and triggers an event to let the
   * rest of the app know that a book was added
   * @param evt {Object} The submit form event object
   * @private
   */
  _onAddBookFormSubmit: function(evt) {
    var $target = $(evt.target),
        $nameInput = $target.find(Elements.bookNameInput),
        bookName = $nameInput.val().toLowerCase(),
        formData = $target.serializeArray(),
        isDuplicate;

    // Loops through the collection in an attempt to find a book that has the same
    // name as the one that was entered
    isDuplicate = this.collection.find(function(item) {
      return item.get('name').toLowerCase() === bookName;
    });

    evt.preventDefault();
    if (isDuplicate) {
      $target.addClass(Classnames.hasError);
    } else {
      PubSub.trigger(Constants.events.SUBMITTED_BOOK_FORM, formData);
      this.close();
    }
  }

});

module.exports = AddBookDialogView;