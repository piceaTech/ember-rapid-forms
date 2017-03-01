import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form-control-help', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function(assert) {
  const component = this.subject();
  this.render();

  assert.ok(Ember.$(component.element).hasClass('help-block'), 'DOM element has default css class');
});

test('renders with extraClass for css', function(assert) {
  const component = this.subject({
    extraClass: 'foo'
  });
  this.render();

  assert.ok(Ember.$(component.element).hasClass('foo'), 'DOM element has default css class');
});

test('Help text is rendered properly', function(assert) {
  const component = this.subject({
    text: 'Hello!'
  });
  this.render();

  assert.equal(Ember.$(component.element).text(), 'Hello!', 'DOM element has default css class');
});

test('Help properties', function(assert) {
  const component = this.subject();
  this.render();

  assert.ok(!Ember.$(component.element).text(), 'Text is empty');
  assert.ok(!component.get('helpText'), 'no help text');
  assert.ok(!component.get('hasHelp'), 'hasHelp is false');
  assert.ok(!component.get('hasError'), 'hasError is false');

  Ember.run(() => {
    component.set('text', 'Hello!');
  });

  assert.equal(Ember.$(component.element).text(), 'Hello!', 'Text is empty');
  assert.ok(component.get('helpText'), 'has help text');
  assert.ok(component.get('hasHelp'), 'hasHelp is true');
  assert.ok(!component.get('hasError'), 'hasError is false');
});

test('Help error binding', function(assert) {
  const component = this.subject({
    mainComponent: Ember.Object.create({
      propertyName: 'name',
      model: Ember.Object.create({
        name: 'my-name',
        errors: Ember.Object.create()
      })
    })
  });
  this.render();

  assert.ok(!component.get('hasError'), 'hasError is false');

  Ember.run(() => {
    component.set('mainComponent.model.errors.age', Ember.A(['age!']));
  });

  assert.ok(!component.get('helpText'), 'no help text if errors has some props but not the bound prop');
  assert.ok(!component.get('hasHelp'), 'hasHelp is false if errors has some props but not the bound prop');
  assert.ok(!component.get('hasError'), 'hasError is false if errors has some props but not the bound prop');

  Ember.run(() => {
    component.set('mainComponent.model.errors.name', Ember.A(['name!']));
  });

  assert.equal(component.get('helpText'), 'name!', 'Help error text found!');
  assert.ok(component.get('hasHelp'), 'has help text');
  assert.ok(component.get('hasError'), 'hasError is true if prop has array with errors');

  Ember.run(() => {
    component.set('mainComponent.model.errors.name', null);
  });

  assert.ok(!component.get('helpText'), 'no help text');
  assert.ok(!component.get('hasHelp'), 'hasHelp is false');
  assert.ok(!component.get('hasError'), 'hasError is false');
});
