import EmberObject from '@ember/object';
import { Promise as EmberPromise } from 'rsvp';
import Mixin from '@ember/object/mixin';
import EmberCpValidationsHelperMixin from 'ember-rapid-forms/mixins/ember-cp-validations-helper';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Mixin | ember cp validations helper', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let ValidationsMixin = Mixin.create({
      validate() {
        const promise = new EmberPromise((resolve) => {
          resolve('ok!');
        });
        return promise;
      },
      validations: {
        validatableAttributes: []
      }
    });

    let EmberCpValidationsHelperObject = EmberObject.extend(ValidationsMixin, EmberCpValidationsHelperMixin);
    let subject = EmberCpValidationsHelperObject.create();

    assert.ok(EmberCpValidationsHelperObject);
    assert.ok(subject);
  });

  test('it works on Object', function(assert) {
    assert.expect(5);
    var finished = assert.async();
    let ValidationsMixin = Mixin.create({
      validations: {
        validatableAttributes: ['username'],
        attrs:{
          username: {
            messages: ['Can\'t be blank']
          }
        },
        validate() {
          const promise = new EmberPromise((resolve) => {
            resolve('ok!');
            finished();
          });
          return promise;
        },
      },
      currentState:{
        stateName: 'notDeleted:P'
      }
    });

    let EmberCpValidationsHelperObject = EmberObject.extend(ValidationsMixin, EmberCpValidationsHelperMixin, {
      username: "",
      errors: EmberObject.create({
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

    const done = assert.async();
    subject.validate().then(function() { // eslint-disable-line ember/named-functions-in-promises
      assert.ok(subject);
      assert.equal(subject.get('errors.username'), 'Can\'t be blank');
      done();
    });
  });
});
