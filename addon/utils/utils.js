import Ember from 'ember';
var Utils;
export default Utils = {
  createBoundSwitchAccessor(switchValue, myProperty, myDefault) {
    if (myDefault == null) {
      myDefault = 'default';
    }
    return Ember.computed(myProperty, {
        get() {
          return this.get(myProperty) === switchValue;
        },
        set(key, value) {
          this.set(myProperty, (value ? switchValue : myDefault));
        }
      });
  }
};
