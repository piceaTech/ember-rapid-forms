import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubI18n from '../../helpers/stub-i18n';

module('em-form-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{#em-form as |form|}}{{form.group property="asd"}}{{/em-form}}`);
    assert.ok(findAll('.form-group').length, 'group has default css class');
  });

  test('it renders with no label', async function(assert) {
    await render(hbs `{{#em-form as |form|}}{{form.group property="asd"}}{{/em-form}}`);
    assert.ok(findAll('label').length === 0, 'group has no label');
  });

  test('it renders with label', async function(assert) {
    await render(hbs `{{#em-form as |form|}}{{form.group property="asd" label='hello'}}{{/em-form}}`);

    assert.dom('label').hasText('hello', 'group has label after it being set');
  });

  test('it renders proper error validation icon', async function(assert) {
    const form = EmberObject.extend();
    this.set('form', form);

    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='error' errorIcon='bell'}}{{/em-form}}`
    );

    let icons = findAll('span i.fa-bell');
    assert.equal(icons.length, 1, 'found validation icon');
    assert.ok(icons[0].className.includes('fa-bell'), 'has error icon');
  });

  test('it renders proper warning validation icon', async function(assert) {
    const form = EmberObject.extend();
    this.set('form', form);

    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='warning' warningIcon='exclamation'}}{{/em-form}}`
    );

    let icons = findAll('span i.fa-exclamation');

    assert.equal(icons.length, 1, 'found validation icon');
    assert.ok(icons[0].className.includes('fa-exclamation'), 'has warning icon');
  });

  test('it renders proper success validation icon', async function(assert) {
    const form = EmberObject.extend();
    this.set('form', form);

    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='success' validationIcon='check-circle'}}{{/em-form}}`
    );

    let icons = findAll('span i.fa-check-circle');

    assert.equal(icons.length, 1, 'found validation icon');
    assert.ok(icons[0].className.includes('fa-check-circle'));
  });

  test('Find the label if i18n is set', async function(assert) {
    const i18nService = stubI18n();
    this.owner.register('service:i18n', i18nService);
    const i18n = this.owner.lookup('service:i18n');
    i18n.addTranslations('en', { 'fruit.name': 'Name' });

    const fruit = EmberObject.create();
    fruit.constructor.modelName = 'fruit';

    this.set('fruit', fruit);
    await render(hbs`{{#em-form as |form|}}{{form.group model=fruit property='name'}}{{/em-form}}`);

    assert.dom('label').hasText('Name', 'the id is not found from i18n');
  });

  test('I18n label is overrided by a given value', async function(assert) {
    const i18nService = stubI18n();
    this.owner.register('service:i18n', i18nService);
    const i18n = this.owner.lookup('service:i18n');
    i18n.addTranslations('en', { 'fruit.name': 'Name' });

    this.set('model', EmberObject.create());
    await render(
      hbs`{{#em-form as |form|}}{{form.group property="asd" model=model label='Custom Label'}}{{/em-form}}`
    );

    assert.dom('label').hasText('Custom Label', 'Doesn\t use custom labels');
  });

  test('Add required class if the field is required', async function(assert) {
    this.set('model', EmberObject.create());
    await render(hbs`{{#em-form as |form|}}{{form.group property="asd" model=model required=true}}{{/em-form}}`);

    assert.ok(find('.form-group').className.includes('required'));
  });

  test('When there a presence validator', async function(assert) {
    // Stub ember-cp-validation
    const Model = EmberObject.extend({
      init(){
        this._super(...arguments);
        this.set('validations', {
          attrs: {
            fullName: {
              options: {
                presence: {
                  presence: true
                }
              }
            }
          }
        });
      }
    });

    this.set('model', Model.create());
    // this has to be an input because setting of required only happens in the input-component mixin
    await render(hbs`{{#em-form as |form|}}{{form.input property='fullName' model=model}}{{/em-form}}`);
    assert.dom('.form-group').hasClass('required', 'from-group should have class required');
  });

  test('renders with labelWrapperClass', async function(assert) {
    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" label='my-label' labelWrapperClass='wrapper-class'}}{{/em-form}}`
    );
    const wrapper = find('div.wrapper-class');
    assert.ok(wrapper, 'Wrapper exists');
    assert.equal(findAll('label').filter((e) => e.textContent.includes('my-label')).length, 1);
  });

  test('renders with yieldInLabel', async function(assert) {
    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" label='my-label' yieldInLabel=true}}{{/em-form}}`
    );

    const labels = findAll('label');
    assert.equal(labels.length, 1, 'Label is a wrapper tag');
    assert.equal(labels.filter((e) => e.textContent.includes('my-label')).length, 1, 'Label is set correctly');
  });

  test('renders with yieldInLabel with labelWrapperClass', async function(assert) {
    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" label='my-label' labelWrapperClass='wrapper-class' yieldInLabel=true}}{{/em-form}}`
    );

    const wrappers = findAll('div.wrapper-class');
    assert.equal(wrappers.length, 1, 'Wrapper exists');

    const labels = findAll('label');
    assert.equal(labels.length, 1, 'Label is a wrapper tag');
    assert.equal(labels.filter((e) => e.textContent.includes('my-label')).length, 1, 'Label is set correctly');
  });

  test('renders v_icon', async function(assert) {
    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" validationIcon='check-square' shouldShowErrors=true validationIcons=true}}{{/em-form}}`
    );

    const icons = findAll('span.form-control-feedback');
    assert.equal(icons.length, 1, 'Has icon span');
    assert.ok(icons[0].className.includes('form-control-feedback'), 'Has proper class');
    assert.equal(icons[0].querySelectorAll('i').length, 1, 'Has icon');
    assert.ok(icons[0].querySelector('i').className.includes('fa-check-square'), 'Icon has proper class');
  });

  test('renders error message', async function(assert) {
    await render(
      hbs `{{#em-form as |form|}}{{form.group property="asd" shouldShowErrors=true helpText='help text here'}}{{/em-form}}`
    );

    const helpSpan = findAll('span.help-block');
    assert.equal(helpSpan.length, 1, 'Has help span');
    assert.ok(helpSpan[0].className.includes('help-block'), 'span has correct class');
    assert.equal(helpSpan[0].textContent.trim(), 'help text here', 'span has correct help text');
  });

  test('does not renders error message when layout is inline', async function(assert) {
    await render(
      hbs `{{#em-form formLayout='inline' as |form|}}{{form.group property="asd" shouldShowErrors=true helpText='help text here'}}{{/em-form}}`
    );

    const helpSpan = findAll('span.help-block');
    assert.equal(helpSpan.length, 0, 'Has no help span');
  });
});
