import { module, test } from 'qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('em-form-label', function(hooks) {
  setupRenderingTest(hooks);

  test('Label renders', async function(assert) {
    await render(hbs `{{#em-form-label for="name"}}inside{{/em-form-label}}`);
    assert.equal(find('label').getAttribute('for'), 'name', 'label has for property');
    assert.ok(find('label').className.includes('control-label'), 'label has default class');
  });

  test('Label renders with extra class', async function(assert) {
    await render(hbs `{{#em-form-label extraClass="foo"}}inside{{/em-form-label}}`);
    assert.ok(find('label').className.includes('foo'), 'label has extra css class');
  });

  test('Label text is set', async function(assert) {
    await render(hbs `{{em-form-label text="Some text"}}`);
    assert.ok(find('label').textContent, 'Some text', 'label renders text');
  });
});
