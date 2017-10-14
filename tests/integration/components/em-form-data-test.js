import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import DS from 'ember-data';
const { Errors } = DS;
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'component:em-form ember-data', {
  // Specify the other units that are required for this test
  integration: true
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

test('a form display DS.Errors when rendered if showErrorsOnRender is set', function(assert) {
  assert.expect(1);

  this.set('someModel', somePerson);
  this.on('submit', function() {
    assert.ok(true, 'submit action invoked!');
  });

  run(() => {
    const errors = Errors.create();
    errors.add('name', 'name!');
    this.get('someModel').set('isValid', false);
    this.get('someModel').set('errors', errors);
  });

  this.render(hbs `{{#em-form model=someModel showErrorsOnRender=true as |form|}}{{form.input property="name"}}{{/em-form}}`);

  run(() => {
    assert.equal(this.$().find('span:contains("name!")').length, 1, "Found help text on form");
  });
});
