import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { defineProperty, computed } from '@ember/object';

/*
A mixin that enriches a component that is attached to a model property that has validation
    support.

This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create({
  init() {
    this._super(...arguments);
    assert('propertyName is required.', !isNone(this.get('propertyName')));
    defineProperty(this, 'errors', alias((`model.errors.${this.get('propertyName')}`)));
  },

  status: computed('errors.length', {
    get() {
      if(this._status !== undefined){
        return this._status;
      }
      if (this.get('errors.length')) {
        return 'error';
      } else {
        return 'success';
      }
    },
    set(key, value){
      return this._status = value;
    }
  })
});
