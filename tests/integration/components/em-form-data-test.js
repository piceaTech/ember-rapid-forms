import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import DS from 'ember-data';
const { Errors } = DS;
import hbs from 'htmlbars-inline-precompile';

module('component:em-form ember-data', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });


  const somePerson = EmberObject.create({
    name: 'my-name',
    errors: EmberObject.create(),
    validate() {
      const promise = new EmberPromise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  test('a form display DS.Errors when rendered if showErrorsOnRender is set', async function(assert) {
    assert.expect(1);

    this.set('someModel', somePerson);
    this.actions.submit = function() {
      assert.ok(true, 'submit action invoked!');
    };

    const errors = Errors.create();
    errors.add('name', 'name!');
    this.get('someModel').set('isValid', false);
    this.get('someModel').set('errors', errors);

    await render(
      hbs `{{#em-form model=someModel showErrorsOnRender=true as |form|}}{{form.input property="name"}}{{/em-form}}`
    );

    assert.equal(findAll('span').filter((e) => e.textContent.includes('name!')).length, 1, "Found help text on form");
  });
});
