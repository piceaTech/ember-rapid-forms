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
    helpText: 'Hello!'
  });
  this.render();

  assert.equal(Ember.$(component.element).text().trim(), 'Hello!', 'Text is rendered');
});
