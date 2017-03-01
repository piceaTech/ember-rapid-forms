import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model;
    model = this.get('store').createRecord('credentials');
    return model;
  }
});
