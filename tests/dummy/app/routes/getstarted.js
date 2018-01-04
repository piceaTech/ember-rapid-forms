import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').createRecord('simple_person', {
      name: "",
      password: "",
      comment: "",
      active: false,
      gender: "M"
    });
  }
});
