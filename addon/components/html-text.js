import Ember from 'ember';
import layout from '../templates/components/html-text';

export default Ember.Component.extend({
  layout: layout,
  didReceiveAttrs() {
    this._super(...arguments);
    // set it to the correct value of the selection
    this.selectedValue = Ember.computed.alias('mainComponent.model.' + this.get('mainComponent.property'));
  }
});
