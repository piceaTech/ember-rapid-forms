import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-text', function(hooks) {
  setupRenderingTest(hooks);

  test('Textarea renders', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.text property="asd"}}{{/em-form}}`);

    assert.equal(findAll('textarea').length, 1, 'label has for property');
  });

  test('Textarea renders with rows', async function(assert) {
    this.set('rows', 3);


    await render(hbs`{{#em-form as |form|}}{{form.text property="asd" rows=rows}}{{/em-form}}`);


    assert.equal(find('textarea').getAttribute('rows'), '3', 'label has rows attr');

    run(() => {
      this.set('rows', 4);
    });


    assert.equal(find('textarea').getAttribute('rows'), '4', 'label has rows attr');
  });

  test('Textarea renders with cols', async function(assert) {
    this.set('cols', 30);

    await render(hbs`{{#em-form as |form|}}{{form.text property="asd" cols=cols}}{{/em-form}}`);

    assert.equal(find('textarea').getAttribute('cols'), '30', 'label has cols attr');

    run(() => {
      this.set('cols', 40);
    });


    assert.equal(element.find('textarea').getAttribute('cols'), '40', 'label has cols attr');
  });

  test('Textarea can be disabled', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.text property="asd" disabled=true}}{{/em-form}}`);
    assert.ok(find('textarea').getAttribute('disabled'), 'input renders disabled');
  });

  test('Textarea renders with custom css', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.text property="asd" elementClass='col-md-6'}}{{/em-form}}`);

    assert.ok(find('textarea').hasClass('col-md-6'), 'Textarea has correct class');
  });

  test('cid correctly sets the id for the textarea and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.text property="asd" label='some label' cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(find('textarea').getAttribute('id'), 'test-cid', 'textarea has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('cid is property by default', async function(assert) {
    this.set('property', 'test-cid');
    await render(hbs`{{#em-form as |form|}}{{form.text label='some label' property=property}}{{/em-form}}`);

    assert.equal(find('textarea').getAttribute('id'), element.find('label').getAttribute('for'), 'the "for" of the label is not the "id" of the input');
  });
});
