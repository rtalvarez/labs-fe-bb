/**
 * PubSub
 *
 * This is the global PubSub object that the app will use to communicate.
 * Custom events that need to be transmitted throughout the app will be triggered
 * on the PubSub object
 *
 * It makes for a good backbone design pattern, since views are decoupled from
 * other parts of the app. Parts of the app that need to respond to events
 * can do so on an as-needed basis, and parts of the app that don't care can
 * ignore the event alltogether by not subscribing to it.
 *
 * Usage:
 * Subscribing to an event:
 * this.listenTo(PubSub, 'eventName', callbackFunction);
 *
 * Triggering an event:
 * PubSub.trigger('eventName', eventData);
 */

module.exports = _.extend({}, Backbone.Events);