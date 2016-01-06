import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-text', {
  // Specify the other units that are required for this test
  needs: [
    'component:form-group',
    'component:form-group-control',
    'component:erf-html-text',
    'component:em-form-label'
  ]
});

test('Textarea renders', function(assert) {

  var component = this.subject();

  this.render();
  assert.equal(Ember.$(component.element).find('textarea').length, 1, 'label has for property');
});

test('Textarea renders with rows', function(assert) {

  var component = this.subject({rows: 3});

  this.render();

  assert.equal(Ember.$(component.element).find('textarea').attr('rows'), '3', 'label has rows attr');

  Ember.run(() => {
    component.set('rows', 4);
  });

  assert.equal(Ember.$(component.element).find('textarea').attr('rows'), '4', 'label has rows attr');
});

test('Textarea renders with cols', function(assert) {

  var component = this.subject({cols: 30});

  this.render();
  assert.equal(Ember.$(component.element).find('textarea').attr('cols'), '30', 'label has cols attr');

  Ember.run(() => {
    component.set('cols', 40);
  });

  assert.equal(Ember.$(component.element).find('textarea').attr('cols'), '40', 'label has cols attr');
});

test('Textarea can be disabled', function(assert) {

  var component = this.subject({disabled: true});

  this.render();
  assert.ok(Ember.$(component.element).attr('disabled'), 'outer div renders disabled');
  assert.ok(Ember.$(component.element).find('textarea').attr('disabled'), 'textarea renders disabled');
});

test('Textarea renders with custom css', function(assert) {

  var component = this.subject({elementClass: 'col-md-6'});

  this.render();
  assert.ok(Ember.$(component.element).find('textarea').hasClass('col-md-6'), 'Textarea has correct class');
});

test('cid correctly sets the id for the textarea and it\'s label', function(assert) {
  assert.expect(2);
  let cid = 'test-cid';
  let component = this.subject({label: 'some label', cid: cid});
  this.render();

  assert.equal(component.$('textarea').attr('id'), cid, 'textarea has correct id');
  assert.equal(component.$('label').attr('for'), cid, 'label has correct \'for\'');
});

test('cid is property by default', function(assert) {
  assert.expect(2);
  let cid = 'test-cid';
  let component = this.subject({label: 'some label', property: cid});
  this.render();

  assert.equal(component.$('textarea').attr('id'), cid, 'textarea has correct id');
  assert.equal(component.$('label').attr('for'), cid, 'label has correct \'for\'');
});
