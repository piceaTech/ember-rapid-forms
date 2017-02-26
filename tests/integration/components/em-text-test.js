import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-text', {
  // Specify the other units that are required for this test
  integration:true
});

test('Textarea renders', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.text}}{{/em-form}}`);

  var element = this.$();
  assert.equal(element.find('textarea').length, 1, 'label has for property');
});

test('Textarea renders with rows', function(assert) {
  this.set('rows', 3);


  this.render(hbs`{{#em-form as |form|}}{{form.text rows=rows}}{{/em-form}}`);


  var element = this.$();
  assert.equal(element.find('textarea').attr('rows'), '3', 'label has rows attr');

  Ember.run(() => {
    this.set('rows', 4);
  });


  assert.equal(element.find('textarea').attr('rows'), '4', 'label has rows attr');
});

test('Textarea renders with cols', function(assert) {
  this.set('cols', 30);

  this.render(hbs`{{#em-form as |form|}}{{form.text cols=cols}}{{/em-form}}`);

  var element = this.$();
  assert.equal(element.find('textarea').attr('cols'), '30', 'label has cols attr');

  Ember.run(() => {
    this.set('cols', 40);
  });


  assert.equal(element.find('textarea').attr('cols'), '40', 'label has cols attr');
});

test('Textarea can be disabled', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.text disabled=true}}{{/em-form}}`);
  assert.ok(this.$().find('textarea').attr('disabled'), 'input renders disabled');
});

test('Textarea renders with custom css', function(assert) {

  this.render(hbs`{{#em-form as |form|}}{{form.text elementClass='col-md-6'}}{{/em-form}}`);

  var element = this.$();
  assert.ok(element.find('textarea').hasClass('col-md-6'), 'Textarea has correct class');
});

test('cid correctly sets the id for the textarea and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{#em-form as |form|}}{{form.text label='some label' cid='test-cid'}}{{/em-form}}`);

  assert.equal(this.$().find('textarea').attr('id'), 'test-cid', 'textarea has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('cid is property by default', function(assert) {
  this.set('property', 'test-cid');
  this.render(hbs`{{#em-form as |form|}}{{form.text label='some label' property=property}}{{/em-form}}`);

  var element = this.$();
  assert.equal(element.find('textarea').attr('id'), element.find('label').attr('for'), 'the "for" of the label is not the "id" of the input');
});
