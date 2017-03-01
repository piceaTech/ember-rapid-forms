import Ember from 'ember';

export default Ember.Component.extend({
  needs: ['application'],
  menu: Ember.A([{
    route: 'overview',
    text: 'Overview',
    items: []
  }, {
    route: 'getstarted',
    text: 'Getting started',
    items: []
  }, {
    route: 'form',
    text: 'Form',
    items: []
  }, {
    route: 'controls',
    text: 'Controls',
    items: Ember.A([{
      route: 'controls.input',
      text: 'Input'
    }, {
      route: 'controls.text',
      text: 'Textarea'
    }, {
      route: 'controls.checkbox',
      text: 'Checkbox'
    }, {
      route: 'controls.select',
      text: 'Select'
    }, {
      route: 'controls.html5',
      text: 'Html5'
    }, {
      route: 'controls.custom-submit',
      text: 'Custom Submit'
    }, {
      route: 'controls.wrapped-input',
      text: 'Wrapped Input'
    }, {
      route: 'controls.custom-styles',
      text: 'Custom Styles'
    }])
  }])
});
