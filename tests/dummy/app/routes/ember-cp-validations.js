import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.get('store').createRecord('person-with-cp-validations', {
            name: "",
            password: "",
            comment: "",
            active: false,
            gender: "M"
        });
  }
});
