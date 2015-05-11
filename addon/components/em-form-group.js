import Ember from 'ember';
import InFormMixin from 'ember-rapid-forms/mixins/in-form';
import HasPropertyMixin from 'ember-rapid-forms/mixins/has-property';
import HasPropertyValidationMixin from 'ember-rapid-forms/mixins/has-property-validation';
import layout from '../templates/components/em-form-group';

/*
Form Group

Wraps labels, controls and help message for optimum spacing and validation styles.
A wrapper for a single input with its assistances views such as label, help message.

A form group can yield the control's view after or within a label, this is dependent on the control
    required layout and is defined byt he yieldInLabel property


Syntax:
{{em-form-group
    //The state of the form group
    status="none|error|warning|success"
    //If true the control view is yieled within the label
    yieldInLabel=true|false
    //If true validation icons will be rendered, by default inherited from the form
    validationIcons: true
    //Label of the form group, default is a human friendly form of the property name
    label="Some label"
}}
 */
export default Ember.Component.extend(InFormMixin, HasPropertyMixin, HasPropertyValidationMixin, {
  tagName: 'div',
  "class": 'form-group',
  layout: layout,
  classNameBindings: ['class', 'hasSuccess', 'hasWarning', 'hasError', 'validationIcons:has-feedback'],
  attributeBindings: ['disabled'],
  canShowErrors: false,
  hasSuccess: Ember.computed('status', 'canShowErrors', function() {
    var success;
    success = this.get('validations') && this.get('status') === 'success' && this.get('canShowErrors');
    this.set('success', success);
    return success;
  }),
  hasWarning: Ember.computed('status', 'canShowErrors', function() {
    var warning;
    warning = this.get('validations') && this.get('status') === 'warning' && this.get('canShowErrors');
    this.set('warning', warning);
    return warning;
  }),
  hasError: Ember.computed('status', 'canShowErrors', function() {
    var error;
    error = this.get('validations') && this.get('status') === 'error' && this.get('canShowErrors');
    this.set('error', error);
    return error;
  }),
  v_icons: Ember.computed.deprecatingAlias('validationIcons'),
  validationIcons: Ember.computed.alias('form.validationIcons'),
  v_success_icon: Ember.computed.deprecatingAlias('successIcon'),
  successIcon: 'fa fa-check',
  v_warn_icon: Ember.computed.deprecatingAlias('warningIcon'),
  warningIcon: 'fa fa-exclamation-triangle',
  v_error_icon: Ember.computed.deprecatingAlias('errorIcon'),
  errorIcon: 'fa fa-times',
  validations: true,
  yieldInLabel: false,
  v_icon: Ember.computed.deprecatingAlias('validationIcon'),
  validationIcon: Ember.computed('status', 'canShowErrors', function() {
    if (!this.get('canShowErrors')) {
      return;
    }
    switch (this.get('status')) {
      case 'success':
        return this.get('successIcon');
      case 'warning':
      case 'warn':
        return this.get('warningIcon');
      case 'error':
        return this.get('errorIcon');
      default:
        return null;
    }
  }),
  shouldShowErrors: Ember.computed('canShowErrors', 'helpText', function() {
    var text = this.get('helpText') || "";
    return text.length > 0 && this.get('canShowErrors');
  }),
  helpText: Ember.computed('text', 'errors.firstObject', function() {
    return this.get('errors.firstObject') || this.get('text');
  }),
  init() {
    return this._super(...arguments);
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
  }
});
