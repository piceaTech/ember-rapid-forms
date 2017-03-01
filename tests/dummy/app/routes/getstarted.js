import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model;
    model = this.get('store').createRecord('simple_person', {
      name: "",
      password: "",
      comment: "",
      active: false,
      gender: "M"
    });
    return model;
  }
});
