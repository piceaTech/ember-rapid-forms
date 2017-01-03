import Ember from 'ember';
import layout from '../templates/components/form-group';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',
  property: null,
  id: Ember.computed('cid', 'property', {
    get: function() {
      if (this.get('cid')) {
        return this.get('cid');
      } else {
        return `${this.get('property')}-${this.elementId}`;
      }
    }
  })
});
