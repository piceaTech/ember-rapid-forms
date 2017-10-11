import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { isPresent } from '@ember/utils';
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
export default Component.extend(HasPropertyValidationMixin, {
  tagName: 'div',
  groupClass: 'form-group',
  layout: layout,
  classNameBindings: ['groupClass', 'hasSuccess', 'hasWarning', 'hasError', 'validationIcons:has-feedback', 'required'],
  attributeBindings: ['disabled'],
  canShowErrors: false,
  successIcon: 'check',
  warningIcon: 'exclamation-triangle',
  errorIcon: 'times',
  hasSetForm: false,

  inputComponent: EmberObject.create(),

  inputId: alias('inputComponent.inputId'),
  yieldInLabel: alias('inputComponent.yieldInLabel'),
  labelInControl: alias('inputComponent.labelInControl'),
  hasError: alias('inputComponent.hasError'),
  hasSuccess: alias('inputComponent.hasSuccess'),
  hasWarning: alias('inputComponent.hasWarning'),
  shouldShowErrors: alias('inputComponent.shouldShowErrors'),
  helpText: alias('inputComponent.helpText'),
  required: alias('inputComponent.required'),
  hideValidationsOnFormChange: alias('inputComponent.hideValidationsOnFormChange'),
  labelWrapperClass: alias('inputComponent.labelWrapperClass'),
  labelClass: alias('inputComponent.labelClass'),
  help: alias('inputComponent.help'),
  controlWrapper: alias('inputComponent.controlWrapper'),
  validationIcons: alias('inputComponent.validationIcons'),
  form: alias('inputComponent.form'),

  i18n: computed(function () {
    return getOwner(this).lookup('service:i18n');
  }),

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

    if (label) {
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
