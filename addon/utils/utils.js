import Ember from 'ember';
var Utils;
export default Utils = {
  createBoundSwitchAccessor(switchValue, myProperty, myDefault) {
    if (myDefault == null) {
      myDefault = 'default';
    }
    return Ember.computed(myProperty, function(key, value) {
      if (arguments.length === 2) {
        this.set(myProperty, (value ? switchValue : myDefault));
      }
      return this.get(myProperty) === switchValue;
    });
  }
};
