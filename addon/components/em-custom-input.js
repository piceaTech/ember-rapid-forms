import FormGroupComponent from './em-form-group';
import hasId from '../mixins/has-id';

/*
Form Input

Syntax:
{{#em-custom-input property="property name"}}Something{{/em-custom-input}}
 */
export default FormGroupComponent.extend(hasId, {
  elementClass: null,
  htmlComponent: 'erf-html-custom-input',
  property: null,
  label: null,
  name: null,
  placeholder: null,
  autofocus: null,
  disabled: null,

  init() {
    this._super(...arguments);

    this.set('id', this.get('inputId'));
  }
});
