import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
/*global alert*/

export default Controller.extend({
  credentials: alias('model'),
  actions: {
    submit() {
      return alert("Logged in!");
    }
  }
});
