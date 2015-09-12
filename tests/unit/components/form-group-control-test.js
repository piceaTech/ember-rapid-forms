import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-group-control', {
  // Specify the other units that are required for this test
  integration: true
});

var mainComponent = Ember.Component.create({
  htmlComponent: 'erf-html-input'
});

test('renders the component', function(assert) {
  this.set('mainComponent', mainComponent);

  this.render(hbs`{{form-group-control mainComponent=mainComponent}}`);

  assert.equal(this.$().find('input').length, 1, 'Has htmlComponent rendered');
});

test('renders the component with wrapper', function(assert) {
  this.set('mainComponent', mainComponent);

  this.render(hbs `{{form-group-control mainComponent=mainComponent controlWrapper='control-wrapper-class'}}`);

  assert.equal(this.$().find('input').length, 1, 'Has htmlComponent rendered');
  assert.ok(this.$().find('div.control-wrapper-class'), 'Has wrapper div');
});
