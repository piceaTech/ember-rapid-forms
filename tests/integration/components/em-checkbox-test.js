import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('checkbox gets rendered', async function(assert) {
    await render(hbs`
    {{#em-form as |form|}}
      {{form.checkbox property="asd"}}
    {{/em-form}}`);

    assert.equal(this.$().find(':checkbox').length, 1);
  });

  test('checkbox also renders label', async function(assert) {
    await render(hbs`{{#em-form as |form|}} {{form.checkbox property="asd" label="my-label"}}{{/em-form}}`);
    assert.equal(this.$().find(':checkbox').length, 1);
    assert.equal(this.$().find('label:contains("my-label")').length, 1);
  });

  test('cid correctly sets the id for the checkbox and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.checkbox property="asd" label="some label" cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(this.$(':checkbox').attr('id'), 'test-cid', 'checkbox has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('cid is property by default', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" property='test-cid'}}{{/em-form}}`);

    assert.equal(this.$(':checkbox').attr('id'), find('label').getAttribute('for'), 'checkbox has correct id');
  });
});
