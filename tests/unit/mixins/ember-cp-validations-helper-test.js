import Ember from 'ember';
import EmberCpValidationsHelperMixin from 'ember-rapid-forms/mixins/ember-cp-validations-helper';
import { moduleFor, test } from 'ember-qunit';

moduleFor('mixin:ember-cp-validations-helper', 'Unit | Mixin | ember cp validations helper');

test('it works', function(assert) {
  let ValidationsMixin = Ember.Mixin.create({
    validate() {
      var promise = new Ember.RSVP.Promise((resolve) => {
        resolve('ok!');
      });
      return promise;
    },
    validations: {
      validatableAttributes: []
    }
  });

  let EmberCpValidationsHelperObject = Ember.Object.extend(ValidationsMixin, EmberCpValidationsHelperMixin);
  assert.ok(EmberCpValidationsHelperObject);
  let subject = EmberCpValidationsHelperObject.create();
  assert.ok(subject);
});