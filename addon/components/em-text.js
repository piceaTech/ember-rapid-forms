import Component from '@ember/component';
import layout from '../templates/components/em-text';
import InputComponentMixin from '../mixins/input-component';

/*
Form Text Area

Syntax:
{{em-text property="property name" rows=4 cols=40}}
 */
export default Component.extend(InputComponentMixin, {
  layout: layout,
  elementClass: null,
  property: null,
  label: null,
  name: null,
  placeholder: null,
  rows: null,
  cols: null,
  autofocus: null,
  readonly: null,
  autoresize: null,
  disabled: null,
  form: null
});
