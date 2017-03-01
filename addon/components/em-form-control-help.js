import Ember from 'ember';
import layout from '../templates/components/em-form-control-help';

const { Component, computed, defineProperty } = Ember;

/*
Form Control Help

Renders a textual help of the control.

Note: currently must be a direct descendant of a form-group or 'property' must be explicitly defined

Syntax:
{{em-form-control-help}}
 */
export default Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ['help-block'],
  classNameBindings: ['extraClass', 'horiClassCalc'],
  text: null,
  extraClass: null,
  horiClass: 'col-sm-offset-2 col-sm-10',

  horiClassCalc: computed('form.isHorizontal', {
    get() {
      if (this.get('form.isHorizontal') && this.get('horiClass')) {
        return this.get('horiClass');
      }
    }
  }),

  helpText: computed('text', 'errors.firstObject', {
    get() {
      return this.get('errors.firstObject.message') || this.get('errors.firstObject') || this.get('text');
    }
  }),

  hasHelp: computed('helpText', {
    get() {
      var helpText = this.get('helpText');
      if (!helpText) {
        return false;
      }
      return helpText.length > 0;
    }
  }),

  hasError: computed('errors.length', {
    get() {
      return this.get('errors') != null;
    }
  }),

  init() {
    this._super(...arguments);
    defineProperty(this, 'errors', computed.alias((`mainComponent.model.errors.${this.get('mainComponent.propertyName')}`)));
  }
});
