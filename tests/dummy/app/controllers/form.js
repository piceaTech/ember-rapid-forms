import Ember from 'ember';
/*global alert*/

export default Ember.Controller.extend({
  actions: {
    someAction() {
      alert("Action triggered");
    }
  }
});
