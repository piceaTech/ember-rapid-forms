import Ember from 'ember';
import layout from '../templates/components/em-form-control-help';

const { Component, computed } = Ember;

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

  errors: computed.alias('formComponent.errors'),
  hasError: computed.alias('formComponent.hasError'),
  horiClassCalc: computed.alias('formComponent.horiClassCalc'),

  helpText: computed('text', 'formComponent.helpText', {
    get() {
      return this.get('formComponent.helpText') || this.get('errors.firstObject') || this.get('text');
    }
  })
});
