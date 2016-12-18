/*global expect*/
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
  let subject = EmberCpValidationsHelperObject.create();

  assert.ok(EmberCpValidationsHelperObject);
  assert.ok(subject);
});

test('it works on Object', function(assert) {
  expect(5);
  let ValidationsMixin = Ember.Mixin.create({
    validations: {
      validatableAttributes: ['username'],
      attrs:{
        username: {
          messages: ['Can\'t be blank']
        }
      },
      validate() {
        var promise = new Ember.RSVP.Promise((resolve) => {
          resolve('ok!');
        });
        return promise;
      },
    },
    currentState:{
      stateName: 'notDeleted:P'
    }
  });

  let EmberCpValidationsHelperObject = Ember.Object.extend(ValidationsMixin, EmberCpValidationsHelperMixin, {
    username: "",
    errors: Ember.Object.create({
      add(/*attribute, messages*/) {
        // we need it currently for testing
      },
      _add(attribute, message) {
        this.set(attribute, message);
      },
    })
  });

  let subject = EmberCpValidationsHelperObject.create();

  assert.ok(EmberCpValidationsHelperObject);
  assert.ok(subject);
  assert.notOk(subject.get('errors.username'));

  subject.validate().then(function() {
    assert.ok(subject);
    assert.equal(subject.get('errors.username'), 'Can\'t be blank');
  });
});
