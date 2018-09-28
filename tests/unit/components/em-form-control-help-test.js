import $ from 'jquery';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('em-form-control-help', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    const component = this.owner.factoryFor('component:em-form-control-help').create();
    this.render();

    assert.ok($(component.element).hasClass('help-block'), 'DOM element has default css class');
  });

  test('renders with extraClass for css', function(assert) {
    const component = this.owner.factoryFor('component:em-form-control-help').create({
      extraClass: 'foo'
    });
    this.render();

    assert.ok($(component.element).hasClass('foo'), 'DOM element has default css class');
  });

  test('Help text is rendered properly', function(assert) {
    const component = this.owner.factoryFor('component:em-form-control-help').create({
      helpText: 'Hello!'
    });
    this.render();

    assert.equal($(component.element).text().trim(), 'Hello!', 'Text is rendered');
  });
});
