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
      name: 'Other'
    }
  ])
});
