import $ from 'jquery';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('em-form-label', function(hooks) {
  setupTest(hooks);

  test('Label renders', function(assert) {

    const component = this.owner.factoryFor('component:em-form-label').create({for: 'name'});

    this.render();
    assert.equal($(component.element).attr('for'), 'name', 'label has for property');
    assert.ok($(component.element).hasClass('control-label'), 'label has default class');
  });

  test('Label renders with extra class', function(assert) {

    const component = this.owner.factoryFor('component:em-form-label').create({extraClass: 'foo'});

    this.render();
    assert.ok($(component.element).hasClass('foo'), 'label has extra css class');
  });

  test('Label text is set', function(assert) {

    const component = this.owner.factoryFor('component:em-form-label').create({text: 'Some text'});

    this.render();
    assert.ok($(component.element).text, 'Some text', 'label renders text');
  });
});
