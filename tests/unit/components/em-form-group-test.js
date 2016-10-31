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
  this.render(hbs `{{em-form-group}}`);
  assert.ok(this.$('.form-group').length, 'group has default css class');
});

test('it renders with no label', function(assert) {
  this.render(hbs `{{em-form-group}}`);
  assert.ok(this.$('label').length === 0, 'group has no label');
});

test('it renders with label', function(assert) {
  this.render(hbs `{{em-form-group label='hello'}}`);

  assert.equal(this.$('label').text().trim(), 'hello', 'group has label after it being set');
});

test('it renders proper error validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{em-form-group form=form canShowErrors=true validationIcons=true status='error' errorIcon='error'}}`);

  let icons = this.$('span i');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('error'));
});

test('it renders proper warning validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{em-form-group form=form canShowErrors=true validationIcons=true status='warning' warningIcon='warning'}}`);

  let icons = this.$('span i');

  assert.equal(icons.length, 1, 'found validation icon');
  assert.ok(icons.hasClass('warning'));
});

test('it renders proper success validation icon', function(assert) {
  const form = Ember.Object.extend();
  this.set('form', form);

  this.render(hbs `{{em-form-group form=form canShowErrors=true validationIcons=true status='success' validationIcon='success'}}`);

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
  this.render(hbs`{{em-form-group model=fruit property='name'}}`);

  assert.equal(this.$('label').text().trim(), 'Name', 'the id is not found from i18n');
});

test('I18n label is overrided by a given value', function(assert) {
  const i18nService = stubI18n();
  this.registry.register('service:i18n', i18nService);
  const i18n = this.container.lookup('service:i18n');
  i18n.addTranslations('en', { 'fruit.name': 'Name' });

  this.set('model', Ember.Object.create());
  this.render(hbs`{{em-form-group model=model label='Custom Label'}}`);

  assert.equal(this.$('label').text().trim(), 'Custom Label', 'Doesn\t use custom labels');
});
