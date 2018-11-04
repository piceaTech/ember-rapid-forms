'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': false,
      'importBootstrapCSS': true,
      whitelist: []
    },
    'ember-font-awesome': {
      includeFontFiles: false
    },
    'ember-prism': {
      'theme': 'okaidia',
      'components': ['handlebars', 'css', 'javascript','markup-templating',], //needs to be an array, or undefined.
      }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
    */

  return app.toTree();
};
