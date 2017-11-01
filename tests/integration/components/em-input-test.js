import EmberObject from '@ember/object';
import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-input', {
  // Specify the other units that are required for this test
  integration: true
});

test('Input gets rendered', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd"}}{{/em-form}}`);

  assert.equal(this.$().find('input').length, 1, 'Input is rendered correctly');
});

test('Input has name attribute', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" name="my-name"}}{{/em-form}}`);

  assert.equal(this.$().find('input').attr('name'), 'my-name', 'name attribute gets rendered');
});


test('Input can be disabled', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" disabled=true}}{{/em-form}}`);

  assert.ok(this.$().find('input').attr('disabled'), 'input renders disabled');
});

test('Input renders with custom css', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" label='My label' elementClass="col-md-6" controlWrapper="col-md-6" labelClass="col-md-4"}}{{/em-form}}`);

  assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(this.$().find('input').closest('.col-md-6').length, 'Input parent has correct class');
  assert.ok(this.$().find('input').hasClass('col-md-6'), 'Input has correct class');
});

test('cid correctly sets the id for the input and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" label="some label" cid='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('input').attr('id'), 'test-cid', 'input has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the input', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.input label="some label" property='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('input').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the input');
});

test('Input can be a required field', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" required=true}}{{/em-form}}`);

  assert.ok(this.$().find('input').attr('required'), 'input becomes a required field');
});

test('Input can be autofocused', function(assert) {
  this.set('fruit', EmberObject.create());

  this.render(hbs`{{#em-form as |form|}}{{form.input property="asd" model=fruit autofocus=true}}{{/em-form}}`);

  assert.ok(this.$().find('input'), 'input has autofocus');
});
