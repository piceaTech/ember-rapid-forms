import Ember from 'ember';

/*
A mixin that enriches a view that is attached to a model property that has validation
    support.

This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    Ember.assert(!Ember.isNone(this.get('propertyName')), 'propertyName is required.');
    return Ember.Binding.from('model.errors.' + this.get('propertyName')).to('errors').connect(this);
  },
  status: Ember.computed('errors.length', function() {
    if (this.get('errors.length')) {
      if (this.get('form.showErrorsOnRender')) {
        this.set('canShowErrors', true);
      }
      return 'error';
    } else {
      return 'success';
    }
  })
});
