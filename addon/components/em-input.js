import Ember from 'ember';
import layout from '../templates/components/em-input';
import HasIdMixin from '../mixins/has-id';

const { Component, observer } = Ember;

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default Component.extend(HasIdMixin, {
  layout: layout,
  elementClass: null,
  property: null,
  name: null,
  placeholder: null,
  title: null,
  pattern: null,
  autofocus: null,
  readonly: null,
  autoresize: null,
  disabled: null,
  canShowErrors: false,

  hideValidationsOnFormChange: observer('form', 'form.model', function() {
    this.set('canShowErrors', false);
  }),

  /*
  Observes the helpHasErrors of the help control and modify the 'status' property accordingly.
   */
  focusIn() {
    if (this.get('form.showErrorsOnFocusIn')) {
      return this.set('canShowErrors', true);
    }
  },

  /*
  Listen to the focus out of the form group and display the errors
   */
  focusOut() {
    return this.set('canShowErrors', true);
  },

  /*
  Listen to the keyUp of the form group and display the errors if showOnKeyUp is true.
   */
  keyUp() {
    if (this.get('showOnKeyUp')) {
      return this.set('canShowErrors', true);
    }
  }
});
