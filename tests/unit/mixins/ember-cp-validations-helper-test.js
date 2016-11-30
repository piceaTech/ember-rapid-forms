import Ember from 'ember';
import ECpValidationsHelperMixin from 'ember-rapid-forms/mixins/ember-cp-validations-helper';
import { module, test } from 'qunit';

module('Unit | Mixin | ember cp validations helper');

// Replace this with your real tests.
test('it works', function(assert) {
  let EmberCpValidationsHelperObject = Ember.Object.extend(EmberCpValidationsHelperMixin);
  let subject = EmberCpValidationsHelperObject.create();
  assert.ok(subject);
});
