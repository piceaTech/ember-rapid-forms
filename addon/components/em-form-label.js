import Ember from 'ember';
import layout from '../templates/components/em-form-label';

const { Component, computed } = Ember;

/*
Form Label

When styled with bootstrap, when form is rendered horizontally, the label require the 'extraClass' property to
    be set to a value such 'col-sm-2' to be aligned properly.

Syntax:
{{em-form-label
    text="Some label"
    extraClass="col-sm-2"
}}

Or can serve as a block helper for elements that needs to be wrapped within label element.
{{#em-form-label text="Active?"}}
    {{em-checkbox}}
{{/em-form-label}}
 */
export default Component.extend({
  layout: layout,
  tagName: 'label',
  classNames: ['control-label'],
  classNameBindings: ['extraClass', 'inlineClassCalc', 'horiClassCalc'],
  attributeBindings: ['for'],
  horiClass: 'col-sm-2',
  inlineClass: 'sr-only',

  horiClassCalc: computed('form.isHorizontal', {
    get: function() {
      if (this.get('form.isHorizontal') && this.get('horiClass')) {
        return this.get('horiClass');
      }
    }
  }),

  inlineClassCalc: computed('form.formLayout', {
    get: function() {
      if (this.get('form.isInline') && this.get('inlineClass')) {
        return this.get('inlineClass');
      }
    }
  })
});
