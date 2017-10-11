import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'em-form checkbox', {
  // Specify the other units that are required for this test
  integration: true
});

let someModel = EmberObject.create({
  userAgree: false,
  errors: EmberObject.create(),
  validate() {
    const promise = new EmberPromise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('a checkbox clicked updates its model', function(assert) {
  assert.expect(1);
  this.set('someModel', someModel);

  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=false  as |form|}}{{form.checkbox property="userAgree"}}{{/em-form}}`);

  let input = this.$('input');

  run(() => {
    input.click();
  });

  run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    someModel.set('userAgree', false);
  });
});

test('a checkbox without a label updates data', function(assert) {
  assert.expect(1);
  this.set('someModel', someModel);
  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=true  as |form|}}Something here: {{form.checkbox property="userAgree"}}{{/em-form}}`);

  run(() => {
    this.$('input').click();
  });

  run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
  });
});

test('Checkbox renders with custom css', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.checkbox label='My label' elementClass="col-md-6" controlWrapper="col-md-8" labelClass="col-md-4"}}{{/em-form}}`);

  assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(this.$().find('label').parent().hasClass('col-md-8'), 'Checkbox parent has correct class');
  assert.ok(this.$().find('input').hasClass('col-md-6'), 'Checkbox input has correct class');
});

test('Checkbox can be disabled', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.checkbox disabled=true}}{{/em-form}}`);

  assert.ok(this.$().find('input').attr('disabled'), 'checkbox input renders disabled');
});

test('cid correctly sets the id for the checkbox and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" cid='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('input').attr('id'), 'test-cid', 'checkbox input has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the checkbox', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" property='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('input').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the checkbox input');
});

test('Checkbox can be a required field', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.checkbox required=true}}{{/em-form}}`);

  assert.ok(this.$().find('input').attr('required'), 'checkbox input becomes a required field');
});

test('Checkbox can be autofocused', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.checkbox autofocus=true}}{{/em-form}}`);

  assert.ok(this.$().find('input').attr('autofocus'), 'checkbox input has autofocus');
});
