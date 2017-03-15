import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('simple_person', {
      name: "",
      password: "",
      comment: "",
      active: false,
      gender: "M"
    });
  }
});
