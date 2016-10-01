import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-group-control', {
  // Specify the other units that are required for this test
  integration: true,

  beforeEach() {
    const mainComponent = this.container.lookupFactory('component:em-form-group').create({
      htmlComponent: 'erf-html-input'
    });
    this.set('mainComponent', mainComponent);
  }
});

test('renders the component', function(assert) {
  this.render(hbs`{{form-group-control mainComponent=mainComponent}}`);

  assert.equal(this.$().find('input').length, 1, 'Has htmlComponent rendered');
});

test('renders the component with wrapper', function(assert) {
  this.render(hbs `{{form-group-control mainComponent=mainComponent controlWrapper='control-wrapper-class'}}`);

  assert.equal(this.$().find('input').length, 1, 'Has htmlComponent rendered');
  assert.ok(this.$().find('div.control-wrapper-class'), 'Has wrapper div');
});
