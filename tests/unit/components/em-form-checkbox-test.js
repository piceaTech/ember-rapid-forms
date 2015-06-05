import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form', 'em-form checkbox', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control',
    'component:control-within-label', 'component:em-form-label',
    'component:em-checkbox']
});

var someModel = Ember.Object.create({
  userAgree: false,
  errors: Ember.Object.create(),
  validate() {
    var promise = new Ember.RSVP.Promise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('a checkbox clicked updates its model', function(assert) {
  assert.expect(1);

  var component = this.subject({
    submitButton: false,
    targetObject: Ember.Controller.create({}),
    model: someModel,
    showErrorsOnFocusIn: true,
    template: Ember.HTMLBars.compile('{{em-checkbox property="userAgree" label="label:"}}')
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('input').click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
  });
});

test('a checkbox without a label updates data', function(assert) {
  assert.expect(1);

  var component = this.subject({
    submitButton: false,
    targetObject: Ember.Controller.create({}),
    model: someModel,
    showErrorsOnFocusIn: true,
    template: Ember.HTMLBars.compile('Something here: {{em-checkbox property="userAgree"}}')
  });

  this.render();

  Ember.run(() => {
    Ember.$(component.element).find('input').click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
  });
});
