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
  v_icons: Ember.computed.deprecatingAlias('validationIcons'),
  validationIcons: false,
  htmlComponent: 'erf-html-select',
  propertyIsModel:false,
  property: null,
  content: null,
  selection: null,
  optionValuePath: 'id',
  optionLabelPath: 'value',
  prompt: null,
  controlWrapper: Ember.computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  })
});
