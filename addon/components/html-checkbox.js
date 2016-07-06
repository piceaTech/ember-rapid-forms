import Ember from 'ember';
import layout from '../templates/components/html-checkbox';

export default Ember.Component.extend({
  layout: layout,

  checked: false,
  init: function() {
    this._super(...arguments);
  },
  didReceiveAttrs( /*attrs*/ ) {
    this._super(...arguments);
    // set it to the correct value of the selection
    this.checked = Ember.computed('mainComponent.model.' + this.get('mainComponent.property'), function() {
      return this.get('mainComponent.model.' + this.get('mainComponent.property'));
    });
  },
  actions: {
    change: function() {
      const selectedEl = this.$('input')[0];
      const checked = selectedEl.checked;
      this.set('mainComponent.model.' + this.get('mainComponent.property'), checked);
      const changeAction = this.get('action');
      if (changeAction) {
        changeAction(checked);
      }
    },
    input: function() {
      // input is always called when input is altered
      // except in IE9 where when cutting or removing things it doesn't get fired
      // https://developer.mozilla.org/en-US/docs/Web/Events/input#Browser_compatibility
      const selectedEl = this.$('input')[0];
      const checked = selectedEl.checked;
      this.set('mainComponent.model.' + this.get('mainComponent.property'), checked);
      const changeAction = this.get('action');
      if (changeAction) {
        changeAction(checked);
      }
    }
  }
});
