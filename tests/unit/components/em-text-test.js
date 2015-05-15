import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-text', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control']
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
