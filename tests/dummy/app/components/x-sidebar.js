import { A } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  menu: computed ( () => {
    return A([{
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
      items: A([{
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
  })
});
