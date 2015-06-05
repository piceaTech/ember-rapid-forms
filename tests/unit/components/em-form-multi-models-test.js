import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('em-form', 'em-form multi models', {
  // Specify the other units that are required for this test
  needs: ['component:form-group', 'component:form-group-control',
    'component:control-within-label', 'component:em-form-label',
    'component:em-input']
});

var myHash = Ember.Object.create({
  modelA: Ember.Object.create({
    name: 'model-a'
  }),
  modelB: Ember.Object.create({
    name: 'model-b'
  })
});

test('a form with hashed models works as expected', function(assert) {
  assert.expect(2);

  var component = this.subject({
    submitButton: false,
    targetObject: Ember.Controller.create({}),
    model: myHash,
    template: Ember.HTMLBars.compile('{{em-input name="a" property="modelA.name" label="modelA name:"}}{{em-input name="b" property="modelB.name" label="modelB name:"}}')
  });

  this.render();

  Ember.run(() => {
    var inputA = Ember.$(component.element).find('input[name="a"]');
    var inputB = Ember.$(component.element).find('input[name="b"]');

    assert.equal(inputA.val(), 'model-a', 'Input A has the correct value');
    assert.equal(inputB.val(), 'model-b', 'Input B has the correct value');
  });
});

test('a form with hashed models updates correct model', function(assert) {
  assert.expect(3);

  var component = this.subject({
    submitButton: false,
    targetObject: Ember.Controller.create({}),
    model: myHash,
    template: Ember.HTMLBars.compile('{{em-input name="a" property="modelA.name" label="modelA name:"}}{{em-input name="b" property="modelB.name" label="modelB name:"}}')
  });

  this.render();

  Ember.run(() => {
    var inputA = Ember.$(component.element).find('input[name="a"]');
    var inputB = Ember.$(component.element).find('input[name="b"]');

    assert.equal(inputA.val(), 'model-a', 'Input A has the correct value');
    assert.equal(inputB.val(), 'model-b', 'Input B has the correct value');

    inputB.val('my-new-val');
    inputB.trigger('change');
  });

  Ember.run(() => {
    assert.equal(myHash.get('modelB.name'), 'my-new-val', 'Input updates its model correctly');
  });
});
