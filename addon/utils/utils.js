import { computed } from '@ember/object';

export default {
  createBoundSwitchAccessor(switchValue, myProperty, myDefault) {
    if (myDefault === null) {
      myDefault = 'default';
    }
    return computed(myProperty, {
      get() {
        return this.get(myProperty) === switchValue;
      },
      set(key, value) {
        this.set(myProperty, (value ? switchValue : myDefault));
      }
    });
  }
}
