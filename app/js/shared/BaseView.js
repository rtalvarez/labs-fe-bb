/**
 * BaseView
 *
 * This is the base backbone view that all views inside the application will extend
 * This can contain custom methods shared between all views, such as the `render` method
 *
 * However we can imagine putting other functionality here, to avoid duplicating code
 * in all of our views.
 */


var BaseView = Backbone.View.extend({
  /**
   * Renders the view. Uses model or collection data (if available)
   * Passes it to the template specified in your view
   * (this.template) should be defined in your view!
   */
  render: function() {
    var data;

    if (this.model) {
      data = this.model.toJSON();
    } else if (this.collection) {
      data = { collection: this.collection.toJSON() };
    }

    this.$el.html(this.template(data));
  }
});

module.exports = BaseView;
