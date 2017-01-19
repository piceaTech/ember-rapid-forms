import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-checkbox', {
  // Specify the other units that are required for this test
  integration: true
});

test('checkbox gets rendered', function(assert) {
  // console.log('as8j');
  // console.log(JSON.stringify(requirejs.entries));
  this.render(hbs`
  {{#em-form as |form|}}
    {{form.checkbox property="asd"}}
  {{/em-form}}`);

  assert.equal(this.$().find(':checkbox').length, 1);
});

test('checkbox also renders label', function(assert) {
  this.render(hbs`{{#em-form as |form|}} {{form.checkbox label="my-label"}}{{/em-form}}`);
  assert.equal(this.$().find(':checkbox').length, 1);
  assert.equal(this.$().find('label:contains("my-label")').length, 1);
});

test('cid correctly sets the id for the checkbox and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" cid='test-cid'}}{{/em-form}}`);

  assert.equal(this.$(':checkbox').attr('id'), 'test-cid', 'checkbox has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('cid is property by default', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.checkbox label="some label" property='test-cid'}}{{/em-form}}`);

  assert.equal(this.$(':checkbox').attr('id'), this.$('label').attr('for'), 'checkbox has correct id');
});
