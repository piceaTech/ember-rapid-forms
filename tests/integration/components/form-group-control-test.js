import EmberObject from '@ember/object';
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
    this.set('mainComponent', EmberObject.create());
  }
});

test('renders the component with wrapper', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.group-control mainComponent=mainComponent controlWrapper='control-wrapper-class'}}{{/em-form}}`);

  assert.ok(this.$().find('div.control-wrapper-class'), 'Has wrapper div');
});
