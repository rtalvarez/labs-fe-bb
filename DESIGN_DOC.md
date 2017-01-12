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

## Folder structure and naming conventions
The app/ folder holds all files needed for development

app/js/ has all the Models,Views and Collections broken up on a per-section basis

app/templates has all the handlebars templates. Each Backbone View has associated
one main handlebars template. The naming is consistent to help make a more logical
structure. So `app/js/section/FooBarView.js` will have an associated template in
`app/templates/section/foo_bar_view.hbs`

app/styles has all SCSS styles, broken down in the same sections `feed` and `nav`
Each view also has an associated SCSS file. So `app/js/section/FooBarView.js` will
have a sass file for it's template in `app/styles/section/foo_bar_view.scss`
 
