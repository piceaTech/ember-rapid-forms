import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('em-form checkbox', function(hooks) {
  setupRenderingTest(hooks);

  let someModel = EmberObject.create({
    userAgree: false,
    errors: EmberObject.create(),
    validate() {
      const promise = new EmberPromise((resolve) => {
        resolve('ok!');
      });
      return promise;
    }
  });

  test('a checkbox clicked updates its model', async function(assert) {
    assert.expect(1);
    this.set('someModel', someModel);

    await render(
      hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=false  as |form|}}{{form.checkbox property="userAgree"}}{{/em-form}}`
    );

    await click('input');

    
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    someModel.set('userAgree', false);
  });

  test('a checkbox without a label updates data', async function(assert) {
    assert.expect(1);
    this.set('someModel', someModel);
    await render(
      hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=true  as |form|}}Something here: {{form.checkbox property="userAgree"}}{{/em-form}}`
    );

    
    await click('input');   

  
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
    
  });

  test('Checkbox renders with custom css', async function(assert) {
    await render(
      hbs`{{#em-form as |form|}}{{form.checkbox property="asd" label='My label' elementClass="col-md-6" controlWrapper="col-md-8" labelClass="col-md-4"}}{{/em-form}}`
    );

    assert.ok(find('label').className.includes('col-md-4'), 'Label has correct class');
    assert.ok(find('label').parentNode.className.includes('col-md-8'), 'Checkbox parent has correct class');
    assert.ok(find('input').className.includes('col-md-6'), 'Checkbox input has correct class');
  });

  test('Checkbox can be disabled', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.checkbox property="asd" disabled=true}}{{/em-form}}`);
    assert.ok(find('input').disabled, 'checkbox input renders disabled');
  });

  test('cid correctly sets the id for the checkbox and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.checkbox property="asd" label="some label" cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(find('input').id, 'test-cid', 'checkbox input has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('the "for" of the label is the "id" of the checkbox', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" property='test-cid'}}{{/em-form}}`);

    assert.equal(find('input').id, find('label').getAttribute('for'), 'the "for" of the label is not the "id" of the checkbox input');
  });

  test('Checkbox can be a required field', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.checkbox property="asd" required=true}}{{/em-form}}`);
    assert.ok(find('input').required, 'checkbox input becomes a required field');
  });

  test('Checkbox can be autofocused', async function(assert) {

    await render(hbs`{{#em-form as |form|}}{{form.checkbox property="asd" autofocus=true}}{{/em-form}}`);

    assert.ok(find('input').autofocus, 'checkbox input has autofocus');
  });
});
