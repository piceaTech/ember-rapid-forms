import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'em-form checkbox', {
  // Specify the other units that are required for this test
  integration: true
});

let someModel = Ember.Object.create({
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
  this.set('someModel', someModel);

  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=false}}{{em-checkbox property="userAgree"}}{{/em-form}}`);

  let input = this.$('input');

  Ember.run(() => {
    input.click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    someModel.set('userAgree', false);
  });
});

test('a checkbox without a label updates data', function(assert) {
  assert.expect(1);
  this.set('someModel', someModel);
  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=true}}Something here: {{em-checkbox property="userAgree"}}{{/em-form}}`);

  Ember.run(() => {
    this.$('input').click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
  });
});
