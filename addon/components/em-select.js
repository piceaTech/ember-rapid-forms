import Component from '@ember/component';
import { computed, get, defineProperty } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/em-select';
import InputComponentMixin from '../mixins/input-component';

/*
Form Select

Syntax:
{{em-select property="property name"
    content=array_of_options
    optionValuePath=keyForValue
    optionLabelPath=keyForLabel
    optionDisabledPath=keyForDisabled
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
  optionDisabledPath: null,
  prompt: null,
  disabled: null,
  autofocus: null,
  size: 0,
  optionGroupLabelPath: null,
  optionGroupContentPath: null,

  didInsertElement() {
    this._super(...arguments);

    run(this, () => {
      if(this.get('model.isLoading')) {
        this.get('model').on('didLoad', () => {
          this._setValue();
        });
      } else {
        this._setValue();
      }
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._addComputedSelectedValue();
  },

  actions: {
    change() {
      this._setValue();

      const changeAction = this.get('action');
      const model = this.get('model');
      const selectedID = model.get(this.get('property'));

      if(model && changeAction){
        changeAction(selectedID);
      }
    }
  },

  _addComputedSelectedValue() {
    const content = this.get('content');

    if (!content) {
      this.set('content', []);
    }

    // set it to the correct value of the selection
    defineProperty(this, 'selectedValue', computed('model.' + this.get('property'), function() {
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
    }));
  },

  _setValue() {
    const selectedEl = this.$('select')[0];
    const model = this.get('model');
    if (model) {

      let selectedIndex = selectedEl.selectedIndex;

      if (selectedIndex < 0 || !this.get('content.length')) return;

      // check whether we show prompt the correct to show index is one less
      // when selecting prompt don't change anything
      if(this.get('prompt')){
        if(selectedIndex !== 0){
          selectedIndex--;
        } else {
          if (this.get('property')) {
            model.set(this.get('property'), null);
          }
          return;
        }
      }

      let selectedID, selectedValue;

      if(this.get('optionGroupContentPath')){
        const selectedElement = selectedEl.options[selectedIndex + 1];
        const optGroup = selectedElement.parentNode;
        const optGroupOptions = optGroup.children;
        const positionInOptGroup = Array.prototype.indexOf.call(optGroupOptions, selectedElement);
        const optionGroup = this.get('content').filterBy(this.get('optionGroupLabelPath'), optGroup.label)[0];

        selectedValue = get(optionGroup, this.get('optionGroupContentPath')).objectAt(positionInOptGroup);
      }
      else{
        const content = this.get('content');
        selectedValue = content.objectAt(selectedIndex);
      }

      if(this.get('optionDisabledPath') && get(selectedValue, this.get('optionDisabledPath'))){
        // if it is disabled don't do anything
        return;
      }

      const optionValuePath = this.get('optionValuePath');
      const propertyIsModel = this.get('propertyIsModel');

      if(propertyIsModel) {
        selectedID = selectedValue;
      } else {
        selectedID = selectedValue[optionValuePath];
      }

      model.set(this.get('property'), selectedID);
    }
  }
});
