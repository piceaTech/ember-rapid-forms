import Ember from 'ember';
import FormGroupComponent from './em-form-group';

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
export default FormGroupComponent.extend({
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
  controlWrapper: Ember.computed('mainComponent.form.formLayout', {
    get: function() {
      if (this.get('mainComponent.form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  })
});
