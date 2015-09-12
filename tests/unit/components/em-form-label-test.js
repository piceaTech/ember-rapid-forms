import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form-label', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('Label renders', function(assert) {

  var component = this.subject({for: 'name'});

  this.render();
  assert.equal(Ember.$(component.element).attr('for'), 'name', 'label has for property');
  assert.ok(Ember.$(component.element).hasClass('control-label'), 'label has default class');
});

test('Label renders with extra class', function(assert) {

  var component = this.subject({extraClass: 'foo'});

  this.render();
  assert.ok(Ember.$(component.element).hasClass('foo'), 'label has extra css class');
});

test('Label text is set', function(assert) {

  var component = this.subject({text: 'Some text'});

  this.render();
  assert.ok(Ember.$(component.element).text, 'Some text', 'label renders text');
});
