import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('html-checkbox', 'Integration | Component | html checkbox', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{erf-html-checkbox}}`);

  assert.equal(this.$().find('input').length, 1, 'renders input element');

  // Template block usage:
  // Is not applicable

});
