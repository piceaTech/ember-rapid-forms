import Ember from 'ember';

const { computed, assert, Mixin } = Ember;

/*
Find the form of the component that merges this mixin
 */
export default Mixin.create({
  formFromPartentView: computed({
    get() {
      let parentView = this.get('parentView');

      while (parentView) {
        if (parentView.get('tagName') === 'form') {
          return parentView;
        }
        parentView = parentView.get('parentView');
      }

      return assert(false, 'Cannot find form');
    }
  }),
  model: computed('form', 'form.model', {
    get() {
      return this.get('form.model');
    }
  })
});
