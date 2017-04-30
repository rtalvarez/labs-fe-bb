exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.

  # Application build path.  Default is public
  #buildPath: ''

  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(node_modules)/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'node_modules/underscore/underscore.js',
          'node_modules/jquery/dist/jquery.js',
          'node_modules/fullcalendar/node_modules/moment/min/moment.min.js',
          'node_modules/fullcalendar/dist/fullcalendar.js',
          'node_modules/fullcalendar/dist/locale/es.js',
          'node_modules/backbone/backbone.js',
          'node_modules/materialize-css/dist/js/materialize.min.js',
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo:
        'stylesheets/app.css': /^(app|vendor|node_modules)/
        'test/stylesheets/test.css': /^test/
      order:
        before: ['vendor/styles/normalize.css']
        after: ['vendor/styles/helpers.css']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/templates.js'

  plugins:
    babel:
      ignore: [
        /^(bower_components|vendor|node_modules)/
      ]

  minify: no

  npm:
    styles:
      'materialize-css': ['dist/css/materialize.css']
      'fullcalendar': ['dist/fullcalendar.css']
    static: [
      'node_modules/underscore/underscore.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/fullcalendar/node_modules/moment/min/moment.min.js',
      'node_modules/fullcalendar/dist/fullcalendar.js',
      'node_modules/fullcalendar/dist/locale/es.js',
      'node_modules/backbone/backbone.js',
      'node_modules/materialize-css/dist/js/materialize.min.js',
    ]
