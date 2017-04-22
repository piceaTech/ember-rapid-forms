import Ember from 'ember';
import layout from '../templates/components/em-checkbox-input';

const { Component, computed } = Ember;

export default Component.extend({
  layout: layout,
  tagName: computed('checkboxWrapper', {
    get() {
      if (this.get('checkboxWrapper')) {
        return 'div';
      }

      return '';
    }
  }),
  classNameBindings: ['checkboxWrapper']
});
