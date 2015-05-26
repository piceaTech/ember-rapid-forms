import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

/* globals ok:true */

moduleForComponent('em-form', {
  // Specify the other units that are required for this test
  needs: ['component:em-form-submit', 'component:em-input', 'component:form-group', 'component:em-form-control-help', 'component:form-group-control']
});

var FormController = Ember.Controller.extend({
  actions: {
    submit() {
      ok(true, 'submit action invoked!');
    }
  }
});

var FormCustomActionController = Ember.Controller.extend({
  actions: {
    submitNow() {
      ok(true, 'submitNow action invoked!');
    }
  }
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
  var component = this.subject({
    model: somePerson
  });

  assert.equal(component.get('model.name'), 'my-name', 'Model was set.');
});

test('a form display errors when rendered if showErrorsOnRender is set', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    showErrorsOnRender: true,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  Ember.run(() => {
    component.get('model').set('isValid', false);
    component.get('model').set('errors.name', Ember.A(['name!']));
  });

  this.render();

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });
});

test('a form display errors when field is focused in', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    showErrorsOnFocusIn: true,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  Ember.run(() => {
    component.get('model').set('isValid', false);
    component.get('model').set('errors.name', Ember.A(['name!']));
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('input').focusin();
  });

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });
});

test('a form display errors when field is focused out', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  Ember.run(() => {
    component.get('model').set('isValid', false);
    component.get('model').set('errors.name', Ember.A(['name!']));
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('input').focusout();
  });

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });
});

test('a form display errors on key up events when field has showOnKeyUp is set', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    template: Ember.HTMLBars.compile('{{em-input property="name" showOnKeyUp=true}}')
  });

  Ember.run(() => {
    component.get('model').set('isValid', false);
    component.get('model').set('errors.name', Ember.A(['name!']));
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('input').keyup();
  });

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });
});

test('a form update inputs on model change', function(assert) {
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  this.render();

  var input = Ember.$(component.element).find('input');
  assert.equal(input.length, 1, "Found input");
  input = Ember.$(input[0]);
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

  var component = this.subject({
    targetObject: FormController.create(),
    model: modelA,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  this.render();

  var input = Ember.$(component.element).find('input');
  assert.equal(input.length, 1, "Found input");
  input = Ember.$(input[0]);
  assert.equal(input.val(), 'model-a', "Input has original model value");

  Ember.run(() => {
    component.set('model', modelB);
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

  var component = this.subject({
    targetObject: FormController.create(),
    model: modelA,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  this.render();

  var input = Ember.$(component.element).find('input');
  assert.equal(input.length, 1, "Found input");
  input = Ember.$(input[0]);
  assert.equal(input.val(), 'model-a', "Input has original model value");

  Ember.run(() => {
    Ember.$(component.element).find('input').focusout();
  });

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });

  Ember.run(() => {
    component.set('model', modelB);
  });

  assert.ok(!input.parent().hasClass('has-success'), "Input is not marked as valid");
  assert.equal(input.val(), 'model-b', "Input has new model value");

});

test('form cannot be submitted if model is invalid', function(assert) {
  assert.expect(0);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson
  });

  this.render();

  Ember.run(() => {
    component.get('model').set('isValid', false);
  });

  Ember.run(() => {
    Ember.$(component.element).find('button').click();
  });
});

test('form can be submitted if model is valid', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson
  });

  this.render();

  Ember.run(() => {
    component.get('model').set('isValid', true);
  });

  Ember.run(() => {
    Ember.$(component.element).find('button').click();
  });
});

test('form submission with custom action', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormCustomActionController.create(),
    model: somePerson,
    action: 'submitNow'
  });

  this.render();

  Ember.run(() => {
    component.get('model').set('isValid', true);
  });

  Ember.run(() => {
    Ember.$(component.element).find('button').click();
  });
});

test('form submission with a model that has no validation support and no isValid property should be submitted', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: {}
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('button').click();
  });
});
