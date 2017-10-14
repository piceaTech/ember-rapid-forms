import EmberObject from '@ember/object';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubI18n from '../../helpers/stub-i18n';

moduleForComponent('em-form-group', {
  // Specify the other units that are required for this test
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group}}{{/em-form}}`);
  assert.ok(this.$('.form-group').length, 'group has default css class');
});

test('it renders with no label', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group}}{{/em-form}}`);
  assert.ok(this.$('label').length === 0, 'group has no label');
});

test('it renders with label', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group label='hello'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'hello', 'group has label after it being set');
});

test('it renders proper error validation icon', function(assert) {
  const form = EmberObject.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='error' errorIcon='bell'}}{{/em-form}}`);

  let icons = this.$('span i.fa-bell');
  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('fa-bell'), 'has error icon');
});

test('it renders proper warning validation icon', function(assert) {
  const form = EmberObject.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='warning' warningIcon='exclamation'}}{{/em-form}}`);

  let icons = this.$('span i.fa-exclamation');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('fa-exclamation'), 'has warning icon');
});

test('it renders proper success validation icon', function(assert) {
  const form = EmberObject.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.group property="asd" form=form shouldShowErrors=true validationIcons=true status='success' validationIcon='check-circle'}}{{/em-form}}`);

  let icons = this.$('span i.fa-check-circle');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('fa-check-circle'));
});

test('Find the label if i18n is set', function(assert) {
  const i18nService = stubI18n();
  this.registry.register('service:i18n', i18nService);
  const i18n = this.container.lookup('service:i18n');
  i18n.addTranslations('en', { 'fruit.name': 'Name' });

  const fruit = EmberObject.create();
  fruit.constructor.modelName = 'fruit';

  this.set('fruit', fruit);
  this.render(hbs`{{#em-form as |form|}}{{form.group model=fruit property='name'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'Name', 'the id is not found from i18n');
});

test('I18n label is overrided by a given value', function(assert) {
  const i18nService = stubI18n();
  this.registry.register('service:i18n', i18nService);
  const i18n = this.container.lookup('service:i18n');
  i18n.addTranslations('en', { 'fruit.name': 'Name' });

  this.set('model', EmberObject.create());
  this.render(hbs`{{#em-form as |form|}}{{form.group model=model label='Custom Label'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'Custom Label', 'Doesn\t use custom labels');
});

test('Add required class if the field is required', function(assert) {
  this.set('model', EmberObject.create());
  this.render(hbs`{{#em-form as |form|}}{{form.group model=model required=true}}{{/em-form}}`);

  assert.ok(this.$('.form-group').hasClass('required'));
});

test('When there a presence validator', function(assert) {
  // Stub ember-cp-validation
  const Model = EmberObject.extend({
    init(){
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
  this.render(hbs`{{#em-form as |form|}}{{form.input property='fullName' model=model}}{{/em-form}}`);
  assert.ok(this.$('.form-group').hasClass('required'), 'from-group should have class required');
});

test('renders with labelWrapperClass', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group property="asd" label='my-label' labelWrapperClass='wrapper-class'}}{{/em-form}}`);
  const wrapper = this.$().find('div.wrapper-class');

  assert.ok(wrapper, 'Wrapper exists');
  assert.equal(wrapper.find('label:contains("my-label")').length, 1, 'Label is inside wrapper');
});

test('renders with yieldInLabel', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group label='my-label' yieldInLabel=true}}{{/em-form}}`);

  const label = this.$().find('label');
  assert.equal(label.length, 1, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
});

test('renders with yieldInLabel with labelWrapperClass', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group label='my-label' labelWrapperClass='wrapper-class' yieldInLabel=true}}{{/em-form}}`);

  const wrapper = this.$().find('div.wrapper-class');
  assert.equal(wrapper.length, 1, 'Wrapper exists');

  const label = wrapper.find('label');
  assert.ok(label, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
});

test('renders v_icon', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group property="asd" validationIcon='check-square' shouldShowErrors=true validationIcons=true}}{{/em-form}}`);

  const icons = this.$().find('span.form-control-feedback');
  assert.equal(icons.length, 1, 'Has icon span');
  assert.ok(icons.hasClass('form-control-feedback'), 'Has proper class');
  assert.equal(icons.find('i').length, 1, 'Has icon');
  assert.ok(this.$(icons.find('i')[0]).hasClass('fa-check-square'), 'Icon has proper class');
});

test('renders error message', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group shouldShowErrors=true helpText='help text here'}}{{/em-form}}`);

  const helpSpan = this.$().find('span.help-block');
  assert.equal(helpSpan.length, 1, 'Has help span');
  assert.ok(helpSpan.hasClass('help-block'), 'span has correct class');
  assert.equal(helpSpan.text().trim(), 'help text here', 'span has correct help text');
});

test('does not renders error message when layout is inline', function(assert) {
  this.render(hbs `{{#em-form formLayout='inline' as |form|}}{{form.group shouldShowErrors=true helpText='help text here'}}{{/em-form}}`);

  const helpSpan = this.$().find('span.help-block');
  assert.equal(helpSpan.length, 0, 'Has no help span');
});
