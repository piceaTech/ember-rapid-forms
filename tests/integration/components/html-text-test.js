import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('html-text', 'Integration | Component | html text', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{erf-html-text}}`);

  assert.equal(this.$().find('textarea').length, 1, 'renders textarea element');


  // Template block usage:
  // not applicable
});
