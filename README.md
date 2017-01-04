## Hello!

1) This app uses brunch.io, to run the app please install brunch:
$ `npm install -g brunch`

2) If compass is not already installed:
$ `gem install compass`

3) After brunch is installed, run app normally:
$ `npm start` (which runs `brunch watch --server` or `brunch w -s` for short)

4) Navigate to:
`localhost:3333`

## Quick facts:

- The feed is pre-populated with the books from the mocks provided
(Mock data is in `public/mock/feed_collection_mock.json`)
- There's no backend component for this project
- Per product requirements, the feed supports an `article` type card (the question I asked Oliver over email)
- Comments provided in the code, navigate to the javascript files for more info on each component
- Design overview provided in `DESIGN_DOC.md`
- Design diagrams provided in `Diagram overview` and `PubSub events`
- Simple Responsive design implemented with media queries corresponding to various card widths (1,2,3 and 4 columns)

## Technologies
Javascript: Backbone.js (bundles underscore and jQuery), require.js
HTML: Handlebars templates
CSS: SASS

The design and styling was inspired by the mocks. No CSS frameworks were used

Leveraging: brunch.io for asset pipeline & app skeleton 
(I did not write the build system)

## Read on DESIGN_DOC.md for more info