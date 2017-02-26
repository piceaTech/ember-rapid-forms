import Ember from 'ember';
import layout from '../templates/components/html-checkbox';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'input',
  attributeBindings: ['type', 'checked', 'id', 'disabled', 'required', 'autofocus'],

  type: "checkbox",
  checked: false,
  init: function() {
    this.elementId = this.get('id');
    this._super(...arguments);
  },

  didReceiveAttrs( /*attrs*/ ) {
    this._super(...arguments);
    // set it to the correct value of the selection
    this.checked = Ember.computed('model.' + this.get('property'), function() {
      return this.get('model.' + this.get('property'));
    });
  },

  change: function() {
    const selectedEl = this.$()[0];
    const checked = selectedEl.checked;
    this.set('model.' + this.get('property'), checked);
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
    this.set('model.' + this.get('property'), checked);
    const changeAction = this.get('action');
    if (changeAction) {
      changeAction(checked);
    }
  }
});
