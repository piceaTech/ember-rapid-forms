import { run } from '@ember/runloop';
import $ from 'jquery';
import {
  moduleForComponent,
  test
  } from 'ember-qunit';

moduleForComponent('em-form', 'component:em-form layout', {
  // Specify the other units that are required for this test
  needs: ['component:em-form-submit', 'component:form-group', 'component:em-form-control-help', 'component:form-group-control']
});

test('form rendering', function(assert) {
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
  const elem = $(component.element);

  assert.equal(elem.attr("role"), "form", "Has form role.");
  assert.equal(elem.prop('tagName'), 'FORM', "Form got rendered");
  assert.ok(elem.find('button').get(0), "Submit got rendered");
  assert.ok(!component.get('model'), 'Form does not have a model');
});

test('submit button rendering', function(assert) {
  const component = this.subject();
  this.render();

  const elem = $(component.element);
  assert.ok(elem.find('button').get(0), "Submit got rendered");

  run(() => {
    component.set('submitButton', false);
  });

  assert.ok(!elem.find('button').get(0), "No submit button is rendered");
});

test('form layout - default', function(assert) {
  const component = this.subject();
  this.render();

  const elem = $(component.element);
  assert.ok(elem.hasClass('form'), "Is form");
  assert.ok(!elem.hasClass('form-inline'), "Is not inline");
  assert.ok(!elem.hasClass('form-horizontal'), "Is not horizontal");

  assert.ok(component.get('isDefaultLayout'));
  assert.ok(!component.get('isInline'));
  assert.ok(!component.get('isHorizontal'));
});

test('form layout - inline', function(assert) {
  const component = this.subject({
    formLayout: 'inline'
  });
  this.render();

  const elem = $(component.element);
  assert.ok(elem.hasClass('form-inline'), "Is inline");
  assert.ok(!elem.hasClass('form'), "Is not form");
  assert.ok(!elem.hasClass('form-horizontal'), "Is not horizontal");

  assert.ok(component.get('isInline'));
  assert.ok(!component.get('isDefaultLayout'));
  assert.ok(!component.get('isHorizontal'));
});

test('form layout - horizontal', function(assert) {
  const component = this.subject({
    formLayout: 'horizontal'
  });
  this.render();

  const elem = $(component.element);
  assert.ok(elem.hasClass('form-horizontal'), "Is horizontal");
  assert.ok(!elem.hasClass('form'));
  assert.ok(!elem.hasClass('form-inline'));

  assert.ok(component.get('isHorizontal'));
  assert.ok(!component.get('isDefaultLayout'));
  assert.ok(!component.get('isInline'));
});
