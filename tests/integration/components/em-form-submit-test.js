import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-form-submit tests', function(hooks) {
  setupRenderingTest(hooks);

  test('a form with em-form-submit components renders correctly', async function(assert) {
    await render(hbs`{{#em-form submitButton=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`);


    assert.dom('button').exists({ count: 1 }, '1 button found');
    assert.dom('button').hasText('Submit!', 'submit has correct text');
  });

  test('Form submit button is disabled when model isnt valid & enabled when is valid', async function(assert) {
    this.set('someModel', EmberObject.create({isValid: false}));

    await render(
      hbs`{{#em-form submitButton=false model=someModel showErrorsOnSubmit=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`
    );
    assert.ok(find('button').disabled, 'Button is disabled');

    this.set('someModel.isValid', true);
    await render(
      hbs`{{#em-form submitButton=false model=someModel showErrorsOnSubmit=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`
    );

    assert.ok(!find('button').disabled, 'Button is enabled');
  });

  test('Submit button has the correct type attribute', async function(assert) {
    await render(hbs`{{#em-form submitButton=false as |form|}}{{form.submit text="Submit!"}}{{/em-form}}`);

    assert.equal(find('button').getAttribute('type'), 'submit', 'default type is submit');
  });
});
