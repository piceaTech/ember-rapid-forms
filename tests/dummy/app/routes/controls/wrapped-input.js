import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var model;
    model = this.get('store').createRecord('simple_person');
    return model;
  }
});