import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('form-group-control', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('mainComponent', EmberObject.create());
  });

  test('renders the component with wrapper', async function(assert) {
    await render(
      hbs`{{#em-form as |form|}}{{form.group-control mainComponent=mainComponent controlWrapper='control-wrapper-class'}}{{/em-form}}`
    );

    assert.dom('div.control-wrapper-class').exists('Has wrapper div');
  });
});
