import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('form-group-control', {
  // Specify the other units that are required for this test
  needs: ['template:dummy']
});

test('renders the component', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    })
  });
  this.render();

  // FIXME: _parentView is a private API
  assert.ok(Ember.$(component._parentView.element).find('div:contains("dummy!")'), 'Has controlView rendered');
});

test('renders the component with wrapper', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    controlWrapper: 'control-wrapper-class'
  });
  this.render();

  // FIXME: _parentView is a private API
  assert.ok(Ember.$(component._parentView.element).find('div:contains("dummy!")'), 'Has controlView rendered');
  assert.ok(Ember.$(component._parentView.element).find('div.control-wrapper-class'), 'Has wrapper div');
});
