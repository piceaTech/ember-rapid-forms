import Ember from 'ember';
import FormGroupComponent from './em-form-group';
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
    model: Ember.computed.alias('mainComponent.model'),
    propertyName: Ember.computed.alias('mainComponent.propertyName'),
    selection: Ember.computed.alias('mainComponent.selection'),
    content: Ember.computed.alias('mainComponent.content'),
    optionValuePath: Ember.computed.alias('mainComponent.optionValuePath'),
    optionLabelPath: Ember.computed.alias('mainComponent.optionLabelPath'),
    prompt: Ember.computed.alias('mainComponent.prompt'),
    multiple: Ember.computed.alias('mainComponent.multiple')
  }),
  propertyIsModel:false,
  property: void 0,
  content: void 0,
  selection: null,
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
