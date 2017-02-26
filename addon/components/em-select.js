import Ember from 'ember';
import layout from '../templates/components/em-select';

/*
Form Select

Syntax:
{{em-select property="property name"
    content=array_of_options
    optionValuePath=keyForValue
    optionLabelPath=keyForLabel
    prompt="Optional default prompt"}}

    //Optional params
    @param propertyIsModel - (boolean) forces the selected object to be assigned to the property instead of the optionValuePath
 */
export default Ember.Component.extend({
  layout: layout,
  validationIcons: false,
  htmlComponent: 'erf-html-select',
  propertyIsModel:false,
  property: null,
  content: null,
  elementClass: null,
  selection: null,
  optionValuePath: 'id',
  optionLabelPath: 'value',
  prompt: null,
  disabled: null,
  autofocus: null,
  size: 0,

  controlWrapper: Ember.computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  }),

  id: Ember.computed('cid', 'property', {
    get: function() {
      if (this.get('cid')) {
        return this.get('cid');
      } else {
        return `${this.get('property')}-${this.elementId}`;
      }
    }
  })
});
