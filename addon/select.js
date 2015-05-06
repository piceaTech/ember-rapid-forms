import Ember from 'ember';
import FormGroupComponent from './group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

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
  v_icons: false,
  controlView: Ember.Select.extend(ControlMixin, {
    model: Ember.computed.alias('parentView.model'),
    propertyName: Ember.computed.alias('parentView.propertyName'),
    content: Ember.computed.alias('parentView.content'),
    optionValuePath: Ember.computed.alias('parentView.optionValuePath'),
    optionLabelPath: Ember.computed.alias('parentView.optionLabelPath'),
    prompt: Ember.computed.alias('parentView.prompt'),
    multiple: Ember.computed.alias('parentView.multiple')
  }),
  propertyIsModel:false,
  property: void 0,
  content: void 0,
  optionValuePath: void 0,
  optionLabelPath: void 0,
  prompt: void 0,
  controlWrapper: Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});
