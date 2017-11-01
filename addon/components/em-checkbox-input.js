import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/em-checkbox-input';

export default Component.extend({
  layout: layout,
  tagName: '',
  label: alias('checkboxComponent.label'),
  form: alias('checkboxComponent.form'),
  inputId: alias('checkboxComponent.inputId'),
  labelClass: alias('checkboxComponent.labelClass'),
  model: alias('checkboxComponent.model'),
  property: alias('checkboxComponent.property'),
  disabled: alias('checkboxComponent.disabled'),
  required: alias('checkboxComponent.required'),
  autofocus: alias('checkboxComponent.autofocus'),
  readonly: alias('checkboxComponent.readonly'),
  title: alias('checkboxComponent.title'),
  elementClass: alias('checkboxComponent.elementClass'),
  name: alias('checkboxComponent.name')
});
