import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-input', {
  // Specify the other units that are required for this test
  integration: true
});

test('Input gets rendered', function(assert) {

  this.render(hbs`{{em-input}}`);

  assert.equal(this.$().find('input').length, 1, 'Input is rendered correctly');
});

test('Input has name attribute', function(assert) {

  this.render(hbs`{{em-input name="my-name"}}`);

  assert.equal(this.$().find('input').attr('name'), 'my-name', 'name attribute gets rendered');
});


test('Input can be disabled', function(assert) {

  this.render(hbs`{{em-input disabled=true}}`);

  assert.ok(this.$().find('input').attr('disabled'), 'input renders disabled');
});

test('Input renders with custom css', function(assert) {
  this.render(hbs`{{em-input label='My label' elementClass="col-md-6" controlWrapper="col-md-6" labelClass="col-md-4"}}`);

  assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(this.$().find('input').parent().parent().hasClass('col-md-6'), 'Input parent has correct class');
  assert.ok(this.$().find('input').hasClass('col-md-6'), 'Input has correct class');
});

test('cid correctly sets the id for the input and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{em-input label="some label" cid='test-cid'}}`);

  assert.equal(this.$('input').attr('id'), 'test-cid', 'input has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the input', function(assert) {
  this.render(hbs`{{em-input label="some label" property='test-cid'}}`);

  assert.equal(this.$('input').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the input');
});
