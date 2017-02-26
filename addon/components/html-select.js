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
    this.selectedValue = Ember.computed('model.' + this.get('property'), function() {
      const propertyIsModel = this.get('propertyIsModel');
      var value = this.get('model.' + this.get('property'));
      if(propertyIsModel && value != null) {
        const optionValuePath = this.get('optionValuePath');
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
    change() {

      const selectedEl = this.$('select')[0];
      let selectedIndex = selectedEl.selectedIndex;
      // check whether we show prompt the correct to show index is one less
      // when selecting prompt don't change anything
      if(this.get('prompt')){
        if(selectedIndex !== 0){
          selectedIndex--;
        } else {
          this.set('model.' + this.get('property'), null);
          return;
        }
      }

      const content = this.get('content');
      const selectedValue = content.objectAt(selectedIndex);
      const optionValuePath = this.get('optionValuePath');
      const propertyIsModel = this.get('propertyIsModel');
      var selectedID;

      if(propertyIsModel) {
        selectedID = selectedValue;
      } else {
        selectedID = selectedValue[optionValuePath];
      }

      this.set('model.' + this.get('property'), selectedID);
      const changeAction = this.get('action');
      if(changeAction){
        changeAction(selectedID);
      }
    }
  }
});
