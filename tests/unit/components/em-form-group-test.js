import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form-group', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control', 'component:em-form-label', 'component:em-form-control-help', 'template:dummy']
});

test('it renders', function(assert) {
  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.ok(Ember.$(component.element).hasClass('form-group'), 'group has default css class');
});

test('it renders with no label', function(assert) {
  // Creates the component instance
  var component = this.subject();

  this.render();
  assert.ok(!component.get('hasLabel'), 'group has no label');

  Ember.run(() => {
    component.set('label', 'hello');
  });

  assert.equal(component.get('label'), 'hello', 'group has label after it being set');
});

test('it renders proper error validation icon', function(assert) {
  // Creates the component instance
  var component = this.subject({
    label: 'my-label',
    form: Ember.Object.extend({}),
    canShowErrors: true,
    validationIcons: true,
    status: 'error'
  });

  // Renders the component to the page
  this.render();
  var icons = Ember.$(component.element).find('span i');
  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(Ember.$(icons[0]).hasClass(component.get('errorIcon')));
});

test('it renders proper warning validation icon', function(assert) {
  // Creates the component instance
  var component = this.subject({
    label: 'my-label',
    form: Ember.Object.extend({}),
    canShowErrors: true,
    validationIcons: true,
    status: 'warning'
  });

  // Renders the component to the page
  this.render();
  var icons = Ember.$(component.element).find('span i');
  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(Ember.$(icons[0]).hasClass(component.get('warningIcon')));
});

test('it renders proper success validation icon', function(assert) {
  // Creates the component instance
  var component = this.subject({
    label: 'my-label',
    form: Ember.Object.extend({}),
    canShowErrors: true,
    validationIcons: true,
    status: 'success'
  });

  // Renders the component to the page
  this.render();
  var icons = Ember.$(component.element).find('span i');
  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(Ember.$(icons[0]).hasClass(component.get('successIcon')));
});
