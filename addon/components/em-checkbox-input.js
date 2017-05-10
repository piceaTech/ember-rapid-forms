import Ember from 'ember';
import layout from '../templates/components/em-checkbox-input';

const { Component, computed } = Ember;

export default Component.extend({
  layout: layout,
  tagName: '',
  label: computed.alias('checkboxComponent.label'),
  form: computed.alias('checkboxComponent.form'),
  inputId: computed.alias('checkboxComponent.inputId'),
  labelClass: computed.alias('checkboxComponent.labelClass'),
  model: computed.alias('checkboxComponent.model'),
  property: computed.alias('checkboxComponent.property'),
  disabled: computed.alias('checkboxComponent.disabled'),
  required: computed.alias('checkboxComponent.required'),
  autofocus: computed.alias('checkboxComponent.autofocus'),
  readonly: computed.alias('checkboxComponent.readonly'),
  title: computed.alias('checkboxComponent.title'),
  elementClass: computed.alias('checkboxComponent.elementClass'),
  name: computed.alias('checkboxComponent.name')
});
