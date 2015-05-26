import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-input', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control', 'component:em-form-label']
});

test('Input gets rendered', function(assert) {

  var component = this.subject();

  this.render();
  assert.equal(Ember.$(component.element).find('input').length, 1, 'Input is rendered correctly');
});

test('Input has name attribute', function(assert) {

  var component = this.subject({name: 'my-name'});

  this.render();

  assert.equal(Ember.$(component.element).find('input').attr('name'), 'my-name', 'name attribute gets rendered');
});

test('Input can render attributes', function(assert) {

  var component = this.subject({placeholder: 'placeholder', required: true, autofocus: true});

  this.render();
  var input = Ember.$(component.element).find('input');
  assert.equal(input.attr('placeholder'), 'placeholder', 'placeholder gets rendered');
  assert.equal(input.attr('required'), 'required', 'input is required');
  assert.equal(input.attr('autofocus'), 'autofocus', 'input has autofocus');

});

test('Input can be disabled', function(assert) {

  var component = this.subject({disabled: true});

  this.render();
  assert.ok(Ember.$(component.element).attr('disabled'), 'outer div renders disabled');
  assert.ok(Ember.$(component.element).find('input').attr('disabled'), 'input renders disabled');
});

test('Input renders with custom css', function(assert) {
  var component = this.subject({
    label: 'My label',
    controlWrapper: "col-md-6",
    labelClass: "col-md-4"
  });

  this.render();
  assert.ok(Ember.$(component.element).find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(Ember.$(component.element).find('input').parent().hasClass('col-md-6'), 'Input parent has correct class');
});
