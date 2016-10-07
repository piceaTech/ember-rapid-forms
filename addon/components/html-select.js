import Ember from 'ember';
import layout from '../templates/components/html-select';

export default Ember.Component.extend({
  layout: layout,

  didReceiveAttrs(/*attrs*/) {
    this._super(...arguments);
    var content = this.get('content');

    if (!content) {
      this.set('content', []);
      // TODO ember warn no content set
    }
    // set it to the correct value of the selection
    this.selectedValue = Ember.computed('mainComponent.model.' + this.get('mainComponent.property'), function() {
      const propertyIsModel = this.get('mainComponent.propertyIsModel');
      var value = this.get('mainComponent.model.' + this.get('mainComponent.property'));
      if(propertyIsModel && value != null) {
        const optionValuePath = this.get('mainComponent.optionValuePath');
        if(value.get === undefined) {
          value = value[optionValuePath];
        } else {
          value = value.get(optionValuePath);
        }
      }
      return value;
    });
  },
  _findSingle (){

  },
  _findMultiple(){

  },
  actions: {
    change(event) {

      const selectedEl = this.$('select')[0];
      let selectedIndex = selectedEl.selectedIndex;
      // check whether we show prompt the correct to show index is one less
      // when selecting prompt don't change anything
      if(this.get('mainComponent.prompt')){
        if(selectedIndex !== 0){
          selectedIndex--;
        } else {
          this.set('mainComponent.model.' + this.get('mainComponent.property'), null);
          return;
        }
      }

      const content = this.get('mainComponent.content');
      const selectedValue = content.objectAt(selectedIndex);
      const optionValuePath = this.get('mainComponent.optionValuePath');
      const propertyIsModel = this.get('mainComponent.propertyIsModel');
      var selectedID;

      if(propertyIsModel) {
        selectedID = selectedValue;
      } else {
        selectedID = selectedValue[optionValuePath];
      }

      this.set('mainComponent.model.' + this.get('mainComponent.property'), selectedID);
      const changeAction = this.get('action');
      if(changeAction){
        changeAction(selectedID);
      }
    }
  }
});
