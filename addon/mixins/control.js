import Ember from 'ember';

/***
Mixin that should be applied for all controls
 */
export default Ember.Mixin.create({
  classNameBindings: ['class'],
  "class": 'form-control',
  init: function() {
    this._super();
    return Ember.Binding.from("model." + (this.get('propertyName'))).to('value').connect(this);
  },
  hasValue: Ember.computed.readOnly('value', function() {
    return this.get('value') !== null;
  })
});