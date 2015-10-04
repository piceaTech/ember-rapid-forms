// TODO: Remove with ember 2.0
import Ember from 'ember';
var originalEmberDeprecate = Ember.deprecate; // we know it is deprecated but can't do anything about it
Ember.deprecate = function(message) {
  if(message !== 'Using Ember.HTMLBars._registerHelper is deprecated. Helpers (even dashless ones) are automatically resolved.' &&  message !== 'ember-get-helper has been included in Ember 2.0. Use of this package is deprecated.'){
    originalEmberDeprecate.apply(this, arguments);
  }
  else{
    console.log('removing deprecation:', message);
  }
};
// end TODO
import {
  moduleForComponent, test
}
from 'ember-qunit';



import hbs from 'htmlbars-inline-precompile';

// TODO: remove when upgrading to ember 2.0
import { registerHelper } from 'ember-get-helper/utils/register-helper';

// if you are on Ember 1.13
import getHelper from 'ember-get-helper/helpers/get-glimmer';

// register it before your tests (this could be in the beforeEach, but it doesn't need to be)

registerHelper('get', getHelper);
// end TODO

moduleForComponent('html-select', 'Integration | Component | html select', {
  integration: true,
  afterEach: function(){
    Ember.deprecate = originalEmberDeprecate;
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs `{{erf-html-select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  // not applicable
});
