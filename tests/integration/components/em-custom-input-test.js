import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-custom-input', function(hooks) {
  setupRenderingTest(hooks);

  test('Input gets rendered', async function(assert) {

    await render(
      hbs`{{#em-form as |form|}}{{#form.custom-input property="asd"}}{{input}}{{/form.custom-input}}{{/em-form}}`
    );

    assert.dom('input').exists({ count: 1 }, 'Input is rendered correctly');
  });

  test('Input renders with custom css', async function(assert) {
    await render(
      hbs`{{#em-form as |form|}}{{#form.custom-input property="asd" label='My label' elementClass="col-md-6" controlWrapper="col-md-8" labelClass="col-md-4" as |mainComponent|}}{{input class=mainComponent.elementClass}}{{/form.custom-input}}{{/em-form}}`
    );
    assert.ok(find('label').hasClass('col-md-4'), 'Label has correct class');
    assert.ok(find('input').parent().hasClass('col-md-8'), 'Input parent has correct class');
  });

  test('cid correctly sets the id for the input and it\'s label', async function(assert) {
    await render(
      hbs`{{#em-form as |form|}}{{#form.custom-input property="asd" label='some label' cid='test-cid' as |mainComponent|}}{{input id=mainComponent.id}}{{/form.custom-input}}{{/em-form}}`
    );

    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });
});
