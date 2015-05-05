import Ember from 'ember';

export default Ember.Controller.extend({
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
  ])
});
