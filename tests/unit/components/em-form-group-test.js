import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form-group', {
  // Specify the other units that are required for this test
  needs: ['template:components/formgroup/form-group', 'template:components/formgroup/form-group-control', 'template:components/em-form-label', 'template:dummy']
});

test('it renders', function(assert) {
  // Creates the component instance
  var component = this.subject({
    controlView: Ember.View.extend({
      templateName: 'dummy'
    })
  });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.ok(Ember.$(component.element).hasClass('form-group'), 'group has default css class');
});

test('it renders with no label', function(assert) {
  // Creates the component instance
  var component = this.subject({
    controlView: Ember.View.extend({
      templateName: 'dummy'
    })
  });

  this.render();
  assert.ok(!component.get('hasLabel'), 'group has no label');

  Ember.run(() => {
    component.set('label', 'hello');
  });

  assert.equal(component.get('label'), 'hello', 'group has label after it being set');
});
