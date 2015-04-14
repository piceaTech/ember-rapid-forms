import Ember from 'ember';

/*
Find the form of the view that merges this mixin
 */
export default Ember.Mixin.create({
  form: Ember.computed('parentView', function() {
    var parentView;
    parentView = this.get('parentView');
    while (parentView) {
      if (parentView.get('tagName') === 'form') {
        return parentView;
      }
      parentView = parentView.get('parentView');
    }
    return Ember.assert(false, 'Cannot find form');
  }),
  model: Ember.computed('form', function() {
    return this.get('form.model');
  })
});