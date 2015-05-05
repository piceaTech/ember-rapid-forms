import Ember from 'ember';
/*global alert*/

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      return alert("Logged in!");
    }
  }
});