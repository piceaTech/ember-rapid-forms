import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-form-control-help', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{em-form-control-help}}`);

    assert.ok(find('span').className.includes('help-block'), 'DOM element has default css class');
  });

  test('renders with extraClass for css', async function(assert) {
    await render(hbs `{{em-form-control-help extraClass="foo"}}`);

    assert.ok(find('span').className.includes('help-block'), 'DOM element has extra css class');
  });

  test('Help text is rendered properly', async function(assert) {
    await render(hbs `{{em-form-control-help helpText="Hello!"}}`);

    assert.equal(find('span').textContent.trim(), 'Hello!', 'Text is rendered');
  });
});
