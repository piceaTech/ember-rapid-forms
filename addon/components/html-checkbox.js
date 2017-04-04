import Ember from 'ember';
import layout from '../templates/components/html-checkbox';


function setFromName(self, mainComponent, name, optionalSecondName){
  if(mainComponent && self){
    let val = mainComponent.get(name);
    if(val){
      if(optionalSecondName){
        self.set(optionalSecondName, [val]);
      }else{
        self.set(name, val);
      }
    }
  }
}


export default Ember.Component.extend({
  layout: layout,
  tagName: 'input',
  attributeBindings: ['type', 'checked', 'id', 'disabled', 'required', 'autofocus'],

  type: "checkbox",
  checked: false,
  init: function() {
    this.elementId = this.get('mainComponent.id');
    this._super(...arguments);
  },
  didReceiveAttrs() {
    this._super(...arguments);
    // set it to the correct value of the selection
    this.checked = Ember.computed('mainComponent.model.' + this.get('mainComponent.property'), function() {
      return this.get('mainComponent.model.' + this.get('mainComponent.property'));
    });

    let mainComponent = this.get('mainComponent');

    setFromName(this, mainComponent, 'name');
    setFromName(this, mainComponent, 'id');
    setFromName(this, mainComponent, 'disabled');
    setFromName(this, mainComponent, 'elementClass', 'classNames');
    setFromName(this, mainComponent, 'required');
    setFromName(this, mainComponent, 'autofocus');
  },
  change: function() {
    const selectedEl = this.$()[0];
    const checked = selectedEl.checked;
    this.set('mainComponent.model.' + this.get('mainComponent.property'), checked);
    const changeAction = this.get('action');
    if (changeAction) {
      changeAction(checked);
    }
  },
  input: function() {
    // input is always called when input is altert
    // except in IE9 where when cutting or removing things it doesn't get fired
    // https://developer.mozilla.org/en-US/docs/Web/Events/input#Browser_compatibility
    const selectedEl = this.$()[0];
    const checked = selectedEl.checked;
    this.set('mainComponent.model.' + this.get('mainComponent.property'), checked);
    const changeAction = this.get('action');
    if (changeAction) {
      changeAction(checked);
    }
  }
});
