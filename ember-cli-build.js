const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css.map');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/highlightjs/highlight.pack.js');
  app.import('bower_components/highlightjs/styles/tomorrow.css');
  app.import('bower_components/ember/ember-template-compiler.js');


  return app.toTree();
};
