import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
/*global alert*/

export default Controller.extend({
  person: alias('model'),
  actions: {
    someAction() {
      alert("Action triggered");
    }
  }
});
