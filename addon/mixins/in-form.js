import Ember from 'ember';

/*
Find the form of the component that merges this mixin
 */
export default Ember.Mixin.create({
  form: Ember.computed('parentView', {
    get: function() {
      var parentView;
      parentView = this.get('parentView');
      while (parentView) {
        if (parentView.get('tagName') === 'form') {
          return parentView;
        }
        parentView = parentView.get('parentView');
      }
      return Ember.assert(false, 'Cannot find form');
    }
  }),
  model: Ember.computed('form', 'form.model', {
    get: function() {
      return this.get('form.model');
    }
  })
});
