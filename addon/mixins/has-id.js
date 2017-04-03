import Ember from 'ember';

const { computed, Mixin } = Ember;

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the formComponent unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create({
  inputId: computed('cid', 'property', 'id', {
    get() {
      if (this.get('cid')) {
        return this.get('cid');
      } else if (this.elementId && this.get('property')) {
        return `${this.get('property')}-${this.elementId}`;
      }
    }
  })
});
