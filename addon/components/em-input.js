import Ember from 'ember';
import FormGroupComponent from './em-form-group';

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default FormGroupComponent.extend({
  elementClass: 'form-control',
  htmlComponent: 'erf-html-input',
  property: null,
  label: null,
  name: null,
  placeholder: null,
  required: null,
  autofocus: null,
  disabled: null,
  controlWrapper: Ember.computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  })
});
