import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form', 'em-form-submit tests', {
  // Specify the other units that are required for this test
  needs: ['component:em-form-submit', 'template:components/em-form-submit']
});

test('a form with em-form-submit components renders correctly', function(assert) {
  var component = this.subject({
    submit_button: false,
    template: Ember.HTMLBars.compile('{{em-form-submit text="Submit!"}}')
  });

  this.render();
  assert.equal(component._state, 'inDOM');
  var elem = Ember.$(component.element);

  assert.equal(elem.find('button').length, 1, '1 button found');
  assert.equal(elem.find('button').text().trim(), 'Submit!', 'submit has correct text');
});

test('Form submit button is disabled when model isnt valid & enabled when is valid', function(assert) {

  var component = this.subject({
    submit_button: false,
    template: Ember.HTMLBars.compile('{{em-form-submit text="Submit!"}}'),
    model: Ember.Object.create({isValid: false})
  });

  this.render();
  assert.ok(Ember.$(component.element).find('button').attr('disabled'), 'Button is disabled');

  Ember.run(() => {
    component.set('model.isValid', true);
  });

  assert.ok(!Ember.$(component.element).find('button').attr('disabled'), 'Button is enabled');
});
