import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';

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

      return assert('Cannot find form');
    }
  }),
  model: computed('form', 'form.model', {
    get() {
      return this.get('form.model');
    }
  })
});
