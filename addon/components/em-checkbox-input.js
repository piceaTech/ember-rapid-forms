import Ember from 'ember';
import layout from '../templates/components/em-checkbox-input';

const { Component, computed } = Ember;

export default Component.extend({
  layout: layout,
  tagName: '',
  classNameBindings: ['checkboxWrapper'],
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('checkboxWrapper')) {
      this.set('tagName', 'div');
    } else {
      this.set('tagName', '');
    }
  },
});
