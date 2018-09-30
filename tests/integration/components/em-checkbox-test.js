import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('checkbox gets rendered', async function(assert) {
    await render(hbs`
    {{#em-form as |form|}}
      {{form.checkbox property="asd"}}
    {{/em-form}}`);

    assert.dom('[type=checkbox]').exists({ count: 1 });
  });

  test('checkbox also renders label', async function(assert) {
    await render(hbs`{{#em-form as |form|}} {{form.checkbox property="asd" label="my-label"}}{{/em-form}}`);
    assert.dom('[type=checkbox]').exists({ count: 1 });
    assert.equal(findAll('label').filter((e) => e.textContent.includes('my-label')).length, 1);
  });

  test('cid correctly sets the id for the checkbox and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.checkbox property="asd" label="some label" cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(find('[type="checkbox"]').id, 'test-cid', 'checkbox has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('cid is property by default', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" property='test-cid'}}{{/em-form}}`);

    assert.equal(find('[type=checkbox]').id, find('label').getAttribute('for'), 'checkbox has correct id');
  });
});
