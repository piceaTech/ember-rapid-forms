import Ember from 'ember';
/*global alert*/

export default Ember.Controller.extend({
  actions: {
    submit() {
      return alert("Logged in!");
    }
  }
});
