import { assert } from '@ember/debug';
import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { defineProperty, computed } from '@ember/object';
import HasIdMixin from '../mixins/has-id';

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the formComponent, computed unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create(HasIdMixin, {
  property: undefined,

  propertyName: computed('property', 'formComponent.property', {
    get() {
      if (this.get('property')) {
        return this.get('property');
      } else if (this.get('formComponent.property')) {
        return this.get('formComponent.property');
      } else {
        return assert('Property could not be found.');
      }
    }
  }),

  init() {
    this._super(...arguments);
    defineProperty(this, 'errors', alias((`model.errors.${this.get('propertyName')}`)));
  }
});
