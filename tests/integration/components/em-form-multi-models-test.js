import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'em-form multi models', {
  // Specify the other units that are required for this test
  integration: true
});

const myHash = EmberObject.create({
  modelA: EmberObject.create({
    name: 'model-a'
  }),
  modelB: EmberObject.create({
    name: 'model-b'
  })
});

test('a form with hashed models works as expected', function(assert) {
  assert.expect(2);

  this.set('myHash', myHash);

  this.render(hbs`{{#em-form model=myHash submitButton=false showErrorsOnFocusIn=false as |form|}}
      {{form.input name="a" property="modelA.name" label="modelA name:"}}
      {{form.input name="b" property="modelB.name" label="modelB name:"}}
    {{/em-form}}`);

  run(() => {
    const inputA = this.$().find('input[name="a"]');
    const inputB = this.$().find('input[name="b"]');

    assert.equal(inputA.val(), 'model-a', 'Input A has the correct value');
    assert.equal(inputB.val(), 'model-b', 'Input B has the correct value');
  });
});

test('a form with hashed models updates correct model', function(assert) {
  assert.expect(3);

  this.set('myHash', myHash);

  this.render(hbs`{{#em-form model=myHash submitButton=false showErrorsOnFocusIn=false as |form|}}
      {{form.input name="a" property="modelA.name" label="modelA name:"}}
      {{form.input name="b" property="modelB.name" label="modelB name:"}}
    {{/em-form}}`);

  run(() => {
    const inputA = this.$().find('input[name="a"]');
    const inputB = this.$().find('input[name="b"]');

    assert.equal(inputA.val(), 'model-a', 'Input A has the correct value');
    assert.equal(inputB.val(), 'model-b', 'Input B has the correct value');

    inputB.val('my-new-val');
    inputB.trigger('change');
  });

  run(() => {
    assert.equal(myHash.get('modelB.name'), 'my-new-val', 'Input updates its model correctly');
  });
});
