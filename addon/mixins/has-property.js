import Ember from 'ember';
import HasIdMixin from '../mixins/has-id';

const { computed, Mixin, assert, defineProperty } = Ember;

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the mainComponent, computed unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create(HasIdMixin, {
  property: undefined,

  propertyName: computed('property', 'mainComponent.property', {
    get() {
      if (this.get('property')) {
        return this.get('property');
      } else if (this.get('mainComponent.property')) {
        return this.get('mainComponent.property');
      } else {
        return assert(false, 'Property could not be found.');
      }
    }
  }),

  init() {
    this._super(...arguments);
    defineProperty(this, 'errors', computed.alias((`model.errors.${this.get('propertyName')}`)));
  }
});
