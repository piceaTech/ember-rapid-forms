import Ember from 'ember';
import HasPropertyValidationMixin from 'ember-rapid-forms/mixins/has-property-validation';
import layout from '../templates/components/em-form-group';

const { Component, computed, inject, isPresent } = Ember;

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
export default Component.extend(HasPropertyValidationMixin, {
  i18n: inject.service(),

  tagName: 'div',
  class: 'form-group',
  layout: layout,
  classNameBindings: ['class', 'hasSuccess', 'hasWarning', 'hasError', 'validationIcons:has-feedback', 'required'],
  attributeBindings: ['disabled'],
  canShowErrors: false,
  successIcon: 'fa fa-check',
  warningIcon: 'fa fa-exclamation-triangle',
  errorIcon: 'fa fa-times',
  validations: true,
  hasSetForm: false,

  inputComponent: Ember.Object.create(),

  inputId: computed.alias('inputComponent.inputId'),
  yieldInLabel: computed.alias('inputComponent.yieldInLabel'),
  hasError: computed.alias('inputComponent.hasError'),
  hasSuccess: computed.alias('inputComponent.hasSuccess'),
  hasWarning: computed.alias('inputComponent.hasWarning'),
  shouldShowErrors: computed.alias('inputComponent.shouldShowErrors'),
  helpText: computed.alias('inputComponent.helpText'),
  required: computed.alias('inputComponent.required'),
  hideValidationsOnFormChange: computed.alias('inputComponent.hideValidationsOnFormChange'),
  labelWrapperClass: computed.alias('inputComponent.labelWrapperClass'),
  labelClass: computed.alias('inputComponent.labelClass'),
  help: computed.alias('inputComponent.help'),
  controlWrapper: computed.alias('inputComponent.controlWrapper'),
  validationIcons: computed.alias('inputComponent.validationIcons'),
  form: computed.alias('inputComponent.form'),

  validationIcon: computed('status', 'canShowErrors', {
    get() {
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
    }
  }),

  label: computed('inputComponent.label', function () {
    const i18n = this.get('i18n');
    const label = this.get('inputComponent.label');

    if(label) {
      return label;
    } else if(isPresent(i18n)) {
      const property = this.get('property');
      const modelName = this.get('model.constructor.modelName');
      let key;

      if(modelName) {
        key = `${modelName}.${property}`;
      } else {
        key = property;
      }

      if(i18n.exists(key)) {
        return i18n.t(key);
      }
    }
  })
});
