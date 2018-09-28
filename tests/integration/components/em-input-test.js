import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-input', function(hooks) {
  setupRenderingTest(hooks);

  test('Input gets rendered', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.input property="asd"}}{{/em-form}}`);

    assert.equal(this.$().find('input').length, 1, 'Input is rendered correctly');
  });

  test('Input has name attribute', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.input property="asd" name="my-name"}}{{/em-form}}`);

    assert.equal(this.$().find('input').attr('name'), 'my-name', 'name attribute gets rendered');
  });


  test('Input can be disabled', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.input property="asd" disabled=true}}{{/em-form}}`);

    assert.ok(this.$().find('input').attr('disabled'), 'input renders disabled');
  });

  test('Input renders with custom css', async function(assert) {
    await render(
      hbs`{{#em-form as |form|}}{{form.input property="asd" label='My label' elementClass="col-md-6" controlWrapper="col-md-6" labelClass="col-md-4"}}{{/em-form}}`
    );

    assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
    assert.ok(this.$().find('input').closest('.col-md-6').length, 'Input parent has correct class');
    assert.ok(this.$().find('input').hasClass('col-md-6'), 'Input has correct class');
  });

  test('cid correctly sets the id for the input and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.input property="asd" label="some label" cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(find('input').id, 'test-cid', 'input has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('the "for" of the label is the "id" of the input', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.input label="some label" property='test-cid'}}{{/em-form}}`);

    assert.equal(find('input').id, find('label').getAttribute('for'), 'the "for" of the label is not the "id" of the input');
  });

  test('Input can be a required field', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.input property="asd" required=true}}{{/em-form}}`);

    assert.ok(this.$().find('input').attr('required'), 'input becomes a required field');
  });

  test('Input can be autofocused', async function(assert) {
    this.set('fruit', EmberObject.create());

    await render(hbs`{{#em-form as |form|}}{{form.input property="asd" model=fruit autofocus=true}}{{/em-form}}`);

    assert.ok(this.$().find('input'), 'input has autofocus');
  });
});
