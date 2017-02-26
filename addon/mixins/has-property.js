import Ember from 'ember';
import hasId from '../mixins/has-id';

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the mainComponent unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Ember.Mixin.create(hasId, {
  property: undefined,

  propertyName: Ember.computed('property', 'mainComponent.property', {
    get: function() {
      if (this.get('property')) {
        return this.get('property');
      } else if (this.get('mainComponent.property')) {
        return this.get('mainComponent.property');
      } else {
        return Ember.assert(false, 'Property could not be found.');
      }
    }
  }),

  init: function() {
    this._super(...arguments);
    Ember.defineProperty(this, 'errors', Ember.computed.alias((`model.errors.${this.get('propertyName')}`)));
  }
});
