import Ember from 'ember';
import layout from '../templates/components/em-input';
import hasId from '../mixins/has-id';

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default Ember.Component.extend(hasId, {
  layout: layout,
  elementClass: null,
  htmlComponent: 'erf-html-input',
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
  controlWrapper: Ember.computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  }),
  didReceiveAttrs( /*attrs*/ ) {
    this._super(...arguments);
    // set it to the correct value of the selection
    this.selectedValue = Ember.computed.alias('model.' + this.get('property'));
  },

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
  },

  hideValidationsOnFormChange: Ember.observer('form', 'form.model', function() {
    this.set('canShowErrors', false);
  })
});
