import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-checkbox', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control',
          'component:control-within-label', 'component:em-form-label']
});

test('checkbox gets rendered', function(assert) {
  var component = this.subject();

  this.render();
  assert.equal(Ember.$(component.element).find(':checkbox').length, 1);
});

test('checkbox also renders label', function(assert) {
  var component = this.subject({
    label: 'my-label'
  });

  this.render();
  assert.equal(Ember.$(component.element).find(':checkbox').length, 1);
  assert.equal(Ember.$(component.element).find('label:contains("my-label")').length, 1);
});
