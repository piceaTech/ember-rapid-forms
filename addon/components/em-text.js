import Ember from 'ember';
import FormGroupComponent from './em-form-group';

/*
Form Text Area

Syntax:
{{em-text property="property name" rows=4 cols=40}}
 */
export default FormGroupComponent.extend({
  elementClass: 'form-control',
  htmlComponent: 'erf-html-text',
  property: null,
  label: null,
  placeholder: null,
  rows: null,
  cols: null,
  disabled: null,
  controlWrapper: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});
