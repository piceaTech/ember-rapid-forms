import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubI18n from '../../helpers/stub-i18n';

moduleForComponent('em-form-group', {
  // Specify the other units that are required for this test
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.formGroup}}{{/em-form}}`);
  assert.ok(this.$('.form-group').length, 'group has default css class');
});

test('it renders with no label', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.formGroup}}{{/em-form}}`);
  assert.ok(this.$('label').length === 0, 'group has no label');
});

test('it renders with label', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.formGroup label='hello'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'hello', 'group has label after it being set');
});

test('it renders proper error validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.formGroup form=form canShowErrors=true validationIcons=true status='error' errorIcon='error'}}{{/em-form}}`);

  let icons = this.$('span i');

  assert.equal(icons.length, 1, 'found validation icon');
  debugger;
  assert.ok(icons.hasClass('error'));
});

test('it renders proper warning validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.formGroup form=form canShowErrors=true validationIcons=true status='warning' warningIcon='warning'}}{{/em-form}}`);

  let icons = this.$('span i');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('warning'));
});

test('it renders proper success validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{#em-form as |form|}}{{form.formGroup form=form canShowErrors=true validationIcons=true status='success' validationIcon='success'}}{{/em-form}}`);

  let icons = this.$('span i');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('success'));
});

test('Find the label if i18n is set', function(assert) {
  const i18nService = stubI18n();
  this.registry.register('service:i18n', i18nService);
  const i18n = this.container.lookup('service:i18n');
  i18n.addTranslations('en', { 'fruit.name': 'Name' });

  const fruit = Ember.Object.create();
  fruit.constructor.modelName = 'fruit';

  this.set('fruit', fruit);
  this.render(hbs`{{#em-form as |form|}}{{form.formGroup model=fruit property='name'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'Name', 'the id is not found from i18n');
});

test('I18n label is overrided by a given value', function(assert) {
  const i18nService = stubI18n();
  this.registry.register('service:i18n', i18nService);
  const i18n = this.container.lookup('service:i18n');
  i18n.addTranslations('en', { 'fruit.name': 'Name' });

  this.set('model', Ember.Object.create());
  this.render(hbs`{{#em-form as |form|}}{{form.formGroup model=model label='Custom Label'}}{{/em-form}}`);

  assert.equal(this.$('label').text().trim(), 'Custom Label', 'Doesn\t use custom labels');
});

test('Add required class if the field is required', function(assert) {
  this.set('model', Ember.Object.create());
  this.render(hbs`{{#em-form as |form|}}{{form.formGroup model=model required=true}}{{/em-form}}`);

  assert.ok(this.$('.form-group').hasClass('required'));
});

test('When there a presence validator', function(assert) {
  // Stub ember-cp-validation
  const Model = Ember.Object.extend({
    validations: {
      attrs: {
        fullName: {
          options: {
            presence: {
              presence: true
            }
          }
        }
      }
    }
  });

  this.set('model', Model.create());
  this.render(hbs`{{#em-form as |form|}}{{form.formGroup property='fullName' model=model}}{{/em-form}}`);

  assert.ok(this.$('.form-group').hasClass('required'));
});
