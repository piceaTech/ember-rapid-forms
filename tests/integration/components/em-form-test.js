import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

/* globals ok:true */

moduleForComponent('em-form', {
  // Specify the other units that are required for this test
  integration: true
});

var somePerson = Ember.Object.create({
  name: 'my-name',
  errors: Ember.Object.create(),
  validate() {
    var promise = new Ember.RSVP.Promise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('form model is set', function(assert) {
  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);
  assert.equal(this.$('input').val(), 'my-name', 'Model was set.');
});

test('a form display errors when rendered if showErrorsOnRender is set', function(assert) {
  assert.expect(1);

  somePerson.set('isValid', false);
  somePerson.set('errors.name', Ember.A(['name!']));

  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model showErrorsOnRender=true as |form|}}{{form.input property="name"}}{{/em-form}}`);


  Ember.run(() => {
    assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");
  });
});

test('a form display errors when field is focused in', function(assert) {
  assert.expect(2);

  somePerson.set('isValid', false);
  somePerson.set('errors.name', Ember.A(['name!']));

  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model showErrorsOnFocusIn=true as |form|}}{{form.input property="name"}}{{/em-form}}`);

  assert.equal(this.$().find('div:contains("name!")').length, 0, "Found no help text on form before focusin");

  this.$().find('input').focusin();
  assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");

});

test('a form display errors when field is focused out', function(assert) {
  assert.expect(2);

  somePerson.set('isValid', false);
  somePerson.set('errors.name', Ember.A(['name!']));

  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  assert.equal(this.$().find('div:contains("name!")').length, 0, "Found help text on form before focusout");
  this.$().find('input').focusout();

  assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");

});

test('a form display errors on key up events when field has showOnKeyUp is set', function(assert) {
  assert.expect(2);

  this.set('model', somePerson);

  somePerson.set('isValid', false);
  somePerson.set('errors.name', Ember.A(['name!']));


  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name" showOnKeyUp=true}}{{/em-form}}`);

  assert.equal(this.$().find('div:contains("name!")').length, 0, "Found no help text on form before keyup");

  this.$().find('input').keyup();
  assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");

});

test('a form display errors when form is submitted and field is invalid', function(assert) {
  assert.expect(2);

  somePerson.set('isValid', false);
  somePerson.set('errors.name', Ember.A(['name!']));
  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  assert.equal(this.$().find('div:contains("name!")').length, 0, "Found help text on form before submit");

  Ember.run(() => {
    this.$().find('button').click();
  });

  assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");
});

test('a form update inputs on model change', function(assert) {
  this.set('model', somePerson);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  var input = this.$().find('input');
  assert.equal(input.length, 1, "Found input");
  input = this.$(input[0]);
  assert.equal(input.val(), 'my-name', "Input has original model value");

  Ember.run(() => {
    somePerson.set('name', 'joseph');
  });

  assert.equal(input.val(), 'joseph', "Input has new model value");

  Ember.run(() => {
    somePerson.set('name', 'my-name');
  });

  assert.equal(input.val(), 'my-name', "Input has original model value again");

});

test('a form changes its model and fields are updated', function(assert) {
  var modelA = Ember.Object.create({
    name: 'model-a',
    errors: Ember.Object.create(),
    validate() {
      var promise = new Ember.RSVP.Promise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  var modelB = Ember.Object.create({
    name: 'model-b',
    errors: Ember.Object.create(),
    validate() {
      var promise = new Ember.RSVP.Promise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  this.set('model', modelA);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  var input = this.$().find('input');
  assert.equal(input.length, 1, "Found input");
  input = this.$(input[0]);
  assert.equal(input.val(), 'model-a', "Input has original model value");

  Ember.run(() => {
    this.set('model', modelB);
  });

  assert.equal(input.val(), 'model-b', "Input has new model value");

});

test('a form changes its model and errors are reseted', function(assert) {
  var modelA = Ember.Object.create({
    name: 'model-a',
    errors: Ember.Object.create(),
    validate() {
      var promise = new Ember.RSVP.Promise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  Ember.run(() => {
    modelA.set('isValid', false);
    modelA.set('errors.name', Ember.A(['name!']));
  });

  var modelB = Ember.Object.create({
    name: 'model-b',
    errors: Ember.Object.create(),
    validate() {
      var promise = new Ember.RSVP.Promise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  this.set('model', modelA);

  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  var input = this.$().find('input');
  assert.equal(input.length, 1, "Found input");
  input = this.$(input[0]);
  assert.equal(input.val(), 'model-a', "Input has original model value");

  Ember.run(() => {
    this.$().find('input').focusout();
  });

  Ember.run(() => {
    assert.equal(this.$().find('div:contains("name!")').length, 1, "Found help text on form");
  });

  Ember.run(() => {
    this.set('model', modelB);
  });

  assert.ok(!input.parent().hasClass('has-success'), "Input is not marked as valid");
  assert.equal(input.val(), 'model-b', "Input has new model value");

});

test('form cannot be submitted if model is invalid', function(assert) {
  assert.expect(0);

  this.on('submit', function() {
    ok(true, 'submit action invoked!');
  });
  this.set('model', somePerson);
  somePerson.set('isValid', false);
  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    this.$().find('button').click();
  });
});

test('form can be submitted if model is valid', function(assert) {
  assert.expect(1);

  this.on('submit', function() {
    ok(true, 'submit action invoked!');
  });
  this.set('model', somePerson);
  somePerson.set('isValid', true);
  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    this.$().find('button').click();
  });
});

test('model in an argument of the form submission', function(assert) {
  assert.expect(1);

  this.on('submit', function(model) {
    model.set('name', 'other-name');
  });

  this.set('model', somePerson);
  somePerson.set('isValid', true);
  this.render(hbs `{{#em-form model=model as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    this.$().find('button').click();
  });

  Ember.run(() => {
    assert.equal(somePerson.get('name'), 'other-name', 'Model is an argument of the form submission');
  });
});

test('form submission with custom action', function(assert) {
  assert.expect(1);

  this.on('submitNow', function() {
    ok(true, 'submitNow action invoked!');
  });
  this.set('model', somePerson);
  somePerson.set('isValid', true);
  this.render(hbs `{{#em-form model=model action="submitNow" as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    this.$().find('button').click();
  });
});

test('form submission with a model that has no validation support and no isValid property should be submitted', function(assert) {
  assert.expect(1);

  this.on('submit', function() {
    ok(true, 'submit action invoked!');
  });
  this.set('model', {});

  this.render(hbs `{{#em-form model=model action='submit' as |form|}}{{form.input property="name"}}{{/em-form}}`);

  Ember.run(() => {
    this.$().find('button').click();
  });
});
