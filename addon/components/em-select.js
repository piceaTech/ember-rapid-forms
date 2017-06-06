import Ember from 'ember';
import layout from '../templates/components/em-select';
import InputComponentMixin from '../mixins/input-component';

const { Component, computed } = Ember;

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
export default Component.extend(InputComponentMixin, {
  layout: layout,
  validationIcons: false,
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

  didRender() {
    this._super(...arguments);
    const content = this.get('content');

    if (!content) {
      this.set('content', []);
    }

    // set it to the correct value of the selection
    this.selectedValue = computed('model.' + this.get('property'), function() {
      const propertyIsModel = this.get('propertyIsModel');
      let value = this.get('model.' + this.get('property'));
      if(propertyIsModel && value !== null && value !== undefined) {
        const optionValuePath = this.get('optionValuePath');
        if(value.get === undefined) {
          value = value[optionValuePath];
        } else {
          value = value.get(optionValuePath);
        }
      }
      return value;
    });

    this._setValue();
  },

  actions: {
    change() {
      this._setValue();
    }
  },

  _setValue() {
    const selectedEl = this.$('select')[0];
    const model = this.get('model');
    if (model) {

      let selectedIndex = selectedEl.selectedIndex;

      if (selectedIndex < 0) return;

      // check whether we show prompt the correct to show index is one less
      // when selecting prompt don't change anything
      if(this.get('prompt')){
        if(selectedIndex !== 0){
          selectedIndex--;
        } else {
          model.set(this.get('property'), null);
          return;
        }
      }

      const content = this.get('content');
      const selectedValue = content.objectAt(selectedIndex);
      const optionValuePath = this.get('optionValuePath');
      const propertyIsModel = this.get('propertyIsModel');
      let selectedID;

      if(propertyIsModel) {
        selectedID = selectedValue;
      } else {
        selectedID = selectedValue[optionValuePath];
      }

      model.set(this.get('property'), selectedID);
      const changeAction = this.get('action');
      if(changeAction){
        changeAction(selectedID);
      }
    }
  }
});
