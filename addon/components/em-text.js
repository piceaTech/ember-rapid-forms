import Ember from 'ember';
import layout from '../templates/components/em-text';

/*
Form Text Area

Syntax:
{{em-text property="property name" rows=4 cols=40}}
 */
export default Ember.Component.extend({
  layout: layout,
  elementClass: null,
  htmlComponent: 'erf-html-text',
  property: null,
  label: null,
  name: null,
  placeholder: null,
  rows: null,
  cols: null,
  autofocus: null,
  readonly: null,
  autoresize: null,
  disabled: null,
  form: null,
  controlWrapper: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  }),

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
