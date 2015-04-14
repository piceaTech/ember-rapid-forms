import Ember from 'ember';
/*global alert*/

export default Ember.Controller.extend({
  layout: 'default',
  genderOptions: Ember.A([
    {
      id: 'M',
      name: 'Male'
    }, {
      id: 'F',
      name: 'Female'
    }, {
      id: 'O',
      name: 'Other'
    }
  ]),
  actions: {
    submit: function() {
      return alert("Submitted!");
    },
    layout: function(t) {
      return this.set('layout', t);
    }
  }
});
