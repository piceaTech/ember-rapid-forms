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
