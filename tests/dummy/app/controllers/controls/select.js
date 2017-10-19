import { A } from '@ember/array';
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  person: alias('model'),
  genderOptions: A([
    {
      id: 'M',
      name: 'Male'
    }, {
      id: 'F',
      name: 'Female'
    }, {
      id: 'O',
      name: 'Other',
      disabled: true
    }
  ]),
  groups: Ember.A([
    {
      name: 'Fruits',
      content: Ember.A([
        {
          id: "A",
          name: "Apple"
        },{
          id: "P",
          name: "Peach"
        }])
    }, { 
      name: 'Vegetables',
      content: Ember.A([
        {
          id: "T",
          name: "Tomato"
        },{
          id: "C",
          name: "Cucumber"
        }])
    }, {
      name: 'Other',
      content: Ember.A([
        {
          id: "B",
          name: "Bread"
        },{
          id: "S",
          name: "Soup"
        }])
    }
  ])
});
