import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import DS from 'ember-data';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

/* globals ok:true */

moduleForComponent('em-form', 'component:em-form ember-data', {
  // Specify the other units that are required for this test
  integration: true
});


const somePerson = Ember.Object.create({
  name: 'my-name',
  errors: Ember.Object.create(),
  validate() {
    const promise = new Ember.RSVP.Promise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('a form display DS.Errors when rendered if showErrorsOnRender is set', function(assert) {
  assert.expect(1);

  this.set('someModel', somePerson);
  this.on('submit', function() {
    ok(true, 'submit action invoked!');
  });

  Ember.run(() => {
    const errors = DS.Errors.create();
    errors.add('name', 'name!');
    this.get('someModel').set('isValid', false);
    this.get('someModel').set('errors', errors);
  });

  this.render(hbs `{{#em-form model=someModel showErrorsOnRender=true as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    assert.equal(this.$().find('span:contains("name!")').length, 1, "Found help text on form");
  });
});
