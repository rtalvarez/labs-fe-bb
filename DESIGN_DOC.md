# `My Books` Backbone app

## Application bootstrapper
The main index.html file inside the public folder bootstraps the app with:
`<script>require('initialize');</script>` which runs `app/initialize.js`

## Design Overview
Please see attached design overview diagram.

This backbone app uses the Publisher/Subscriber (PubSub) decoupling pattern
for additional modularity.

Design is centered around modularity, reusability and DRY concepts.
For the Javascript, this means leveraging Backbone views, subviews and writing components
and views in a way that's easy for other devs to pick up. The self-contained modules
in this app have their self-contained templates, styles, views and models.

Simple SCSS mixins and reset styles have also been written to make CSS modular too

Briefly, the app is broken down into modules, and the main components are:

- AppView (Type: Backbone.View)
This is the main view for the application. It initializes all needed subcomponents
It makes sure all components have access to the data they need.

- FeedCollection (Type: Backbone.Collection)
This is a collection of feed item models. The feed collection communicates with the
backend service (although it's just a mock file for this project) and maintains
a collection of all models. The FeedCollection handles add/remove/fetch operations
on the models.

- FeedItemModel (Type: Backbone.Model)
This is the model data that holds the necessary information to render the cards in 
the feed. The schema for FeedItemModels is as follows:

key-name | type:
------------
id : number
type : string
name : string
author : string
coverUrl : string
rating : number
-------------

- NavView (Type: Backbone.View)
This is the view for the global nav. It includes the book sublinks and the submenu
for responsive mode. NavView needs access to FeedCollection, since all book
titles need to be rendered in the sub menu. Nav View also handles scrolling to the
corresponding card whenever a title in the nav is clicked. It also handles hiding and
showing the menu icons when in mobile mode.

- FeedCollectionView (Type: Backbone.View)
This is the main view for the feed. It houses sub-views for all of the items in the 
FeedCollection. Upon initialize, it loops through the FeedCollection and initializes
one subview (FeedItemView) per item in the collection. It also houses the Welcome back card,
and initializes a special view for that.

- FeedItemView (Type: Backbone.View)
This is the view that corresponds to a particular FeedItemModel inside FeedCollection.
The cards in the feed are FeedItemViews. They control interactions within the card
and render the markup for the cards

- WelcomeBackView (Type: Backbone.View)
This is the view for the special card that is in the top of the feed. This card
has a subview that corresponds to the dialog that is opened when users click on Add.

- AddBookDialogView (Type: Backbone.View)
This is the dialog that has the form to populate a new book. It will capture that form
data and emit an event that will be catched by the FeedCollection to create a new
FeedItemModel. After being added to the collection, FeedCollectionView and the NavView
will update the UI with the new model.

## Folder structure and naming conventions
The app/ folder holds all files needed for development

app/js/ has all the Models,Views and Collections broken up on a per-section basis
The app has two main sections: `feed` and `nav`

app/templates has all the handlebars templates. Each Backbone View has associated
one main handlebars template. The naming is consistent to help make a more logical
structure. So `app/js/section/FooBarView.js` will have an associated template in
`app/templates/section/foo_bar_view.hbs`

app/styles has all SCSS styles, broken down in the same sections `feed` and `nav`
Each view also has an associated SCSS file. So `app/js/section/FooBarView.js` will
have a sass file for it's template in `app/styles/section/foo_bar_view.scss`
 
