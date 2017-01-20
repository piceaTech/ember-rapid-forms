import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-group', {
  // Specify the other units that are required for this test
  integration: true,

  beforeEach() {
    const mainComponent = Ember.Object.create({
      htmlComponent: 'erf-html-checkbox',
      validationIcon: 'some-icon-class'
    });
    this.set('mainComponent', mainComponent);
  }
});

test('renders the component', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent}}{{/em-form}}`);
  assert.equal(this.$().find('input').length, 1, 'Has mainComponent rendered');
});

test('renders with label', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent label='my-label'}}{{/em-form}}`);
  assert.equal(this.$().find('label:contains("my-label")').length, 1, 'Has a label');
  assert.equal(this.$().find('input').length, 1, 'Has mainComponent rendered');
});

test('renders with labelWrapperClass', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent label='my-label' labelWrapperClass='wrapper-class'}}{{/em-form}}`);
  var wrapper = this.$().find('div.wrapper-class');

  assert.ok(wrapper, 'Wrapper exists');
  assert.equal(wrapper.find('label:contains("my-label")').length, 1, 'Label is inside wrapper');
  assert.equal(wrapper.find('input').length, 1, 'Has mainComponent rendered');
});

test('renders with yieldInLabel', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent label='my-label' yieldInLabel=true}}{{/em-form}}`);

  var label = this.$().find('label');
  assert.equal(label.length, 1, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
  assert.equal(label.find('input').length, 1, 'Label has mainComponent input');
});

test('renders with yieldInLabel with labelWrapperClass', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent label='my-label' labelWrapperClass='wrapper-class' yieldInLabel=true}}{{/em-form}}`);

  var wrapper = this.$().find('div.wrapper-class');
  assert.equal(wrapper.length, 1, 'Wrapper exists');

  var label = wrapper.find('label');
  assert.ok(label, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
  assert.equal(label.find('input').length, 1, 'Label has mainComponent input');
});

test('renders v_icon', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent validationIcons=true}}{{/em-form}}`);

  var icons = this.$().find('span');
  assert.equal(icons.length, 1, 'Has icon span');
  assert.ok(icons.hasClass('form-control-feedback'), 'Has proper class');
  assert.equal(icons.find('i').length, 1, 'Has icon');
  assert.ok(this.$(icons.find('i')[0]).hasClass('some-icon-class'), 'Icon has proper class');
});

test('renders error message', function(assert) {
  this.render(hbs `{{#em-form as |form|}}{{form.group mainComponent=mainComponent shouldShowErrors=true help='help text here'}}{{/em-form}}`);

  assert.equal(this.$().find('input').length, 1, 'Has mainComponent rendered');

  var helpSpan = this.$().find('span');
  assert.equal(helpSpan.length, 1, 'Has help span');
  assert.ok(helpSpan.hasClass('help-block'), 'span has correct class');
  assert.equal(helpSpan.text().trim(), 'help text here', 'span has correct help text');
});

test('does not renders error message when layout is inline', function(assert) {
  this.render(hbs `{{#em-form formLayout='inline' as |form|}}{{form.group mainComponent=mainComponent shouldShowErrors=true help='help text here'}}{{/em-form}}`);

  assert.equal(this.$().find('input').length, 1, 'Has mainComponent rendered');

  var helpSpan = this.$().find('span');
  assert.equal(helpSpan.length, 0, 'Has no help span');

});

// console.log(this.$()[0].outerHTML);
