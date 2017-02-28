import Ember from 'ember';

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the mainComponent unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Ember.Mixin.create({
  inputId: Ember.computed('cid', 'property', 'id', {
    get: function() {
      if (this.get('cid')) {
        return this.get('cid');
      } else {
        return `${this.get('property')}-${this.get('id')}`;
      }
    }
  })
});
