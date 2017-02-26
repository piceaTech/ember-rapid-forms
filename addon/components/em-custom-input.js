import FormGroupComponent from './em-form-group';

/*
Form Input

Syntax:
{{#em-custom-input property="property name"}}Something{{/em-custom-input}}
 */
export default FormGroupComponent.extend({
  elementClass: null,
  htmlComponent: 'erf-html-custom-input',
  property: null,
  label: null,
  name: null,
  placeholder: null,
  autofocus: null,
  disabled: null
});
