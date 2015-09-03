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
  this.render(hbs`{{em-input label='My label' controlWrapper="col-md-6" labelClass="col-md-4"}}`);
  
  assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(this.$().find('input').parent().parent().hasClass('col-md-6'), 'Input parent has correct class');
});
