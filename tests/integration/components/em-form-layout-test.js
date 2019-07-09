import { module, test } from 'qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('component:em-form layout', function(hooks) {
  setupRenderingTest(hooks);

  test('form rendering', async function(assert) {
    await render(hbs`{{em-form}}`);
    

    assert.equal(find('form').getAttribute("role"), "form", "Has form role.");
    assert.equal(find('form').tagName, 'FORM', "Form got rendered");
    assert.ok(find('button'), "Submit got rendered");
  });

  test('submit button rendering', async function(assert) {
    this.set('submitButton', true);
    await render(hbs`{{em-form submitButton=submitButton}}`);

    
    assert.ok(find('button'), "Submit got rendered");

    this.set('submitButton', false);
    await render(hbs`{{em-form submitButton=submitButton}}`);

    assert.equal(findAll('button').length, 0, "No submit button is rendered");
  });

  test('form layout - default', async function(assert) {
    await render(hbs`{{em-form}}`);

    const classnames = ' ' + find('form').className + ' ';
    assert.ok(classnames.includes(' form '), "Is form");
    assert.ok(!classnames.includes(' form-inline '), "Is not inline");
    assert.ok(!classnames.includes(' form-horizontal '), "Is not horizontal");
  });

  test('form layout - inline', async function(assert) {
    await render(hbs`{{em-form formLayout='inline'}}`);

    const classnames = ' ' + find('form').className + ' ';
    assert.ok(classnames.includes(' form-inline '), "Is inline");
    assert.ok(!classnames.includes(' form '), "Is not form");
    assert.ok(!classnames.includes(' form-horizontal '), "Is not horizontal");
  });

  test('form layout - horizontal', async function(assert) {
    await render(hbs`{{em-form formLayout='horizontal'}}`);

    const classnames = ' ' + find('form').className + ' ';
    assert.ok(classnames.includes(' form-horizontal '), "Is horizontal");
    assert.ok(!classnames.includes(' form '));
    assert.ok(!classnames.includes(' form-inline '));
  });
});
