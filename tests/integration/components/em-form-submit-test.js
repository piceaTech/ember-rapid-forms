import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'em-form-submit tests', {
  // Specify the other units that are required for this test
  integration: true
});

test('a form with em-form-submit components renders correctly', function(assert) {
  this.render(hbs`{{#em-form submitButton=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`);


  var elem = this.$();

  assert.equal(elem.find('button').length, 1, '1 button found');
  assert.equal(elem.find('button').text().trim(), 'Submit!', 'submit has correct text');
});

test('Form submit button is disabled when model isnt valid & enabled when is valid', function(assert) {
  this.set('someModel', Ember.Object.create({isValid: false}));

  this.render(hbs`{{#em-form submitButton=false model=someModel showErrorsOnSubmit=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`);

  assert.ok(this.$().find('button').attr('disabled'), 'Button is disabled');

  Ember.run(() => {
    this.set('someModel.isValid', true);
  });

  assert.ok(!this.$().find('button').attr('disabled'), 'Button is enabled');
});

test('Submit button has the correct type attribute', function(assert) {
  this.render(hbs`{{#em-form submitButton=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`);
  
  assert.equal(this.$().find('button').attr('type'), 'submit', 'default type is submit');
});
