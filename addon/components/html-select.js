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
      return this.get('mainComponent.model.' + this.get('mainComponent.property'));
    });
  },

  actions: {
    change() {
      
      const selectedEl = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const content = this.get('mainComponent.content');
      const selectedValue = content[selectedIndex];
      const selectedID = selectedValue[this.get('mainComponent.optionValuePath')];
      this.set('selectedValue', selectedValue);
      this.set('mainComponent.model.' + this.get('mainComponent.property'), selectedID);
      const changeAction = this.get('action');
      if(changeAction){
        changeAction(selectedValue);
      }
      else{
        // TODO make deprecate here so everyone switches to new action syntax
      }
    }
  }
});
