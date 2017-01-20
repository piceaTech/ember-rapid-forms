import Ember from 'ember';
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
export default Ember.Component.extend(HasPropertyMixin, HasPropertyValidationMixin, {
  tagName: 'div',
  "class": 'form-group',
  htmlComponent: 'em-custom-input',
  layout: layout,
  classNameBindings: ['class', 'hasSuccess', 'hasWarning', 'hasError', 'validationIcons:has-feedback', 'required'],
  attributeBindings: ['disabled'],
  canShowErrors: false,
  i18n: Ember.computed(function() {
    return Ember.getOwner(this).lookup('service:i18n');
  }),

  hasSuccess: Ember.computed('status', 'canShowErrors', {
    get: function() {
      var success;
      success = this.get('validations') && this.get('status') === 'success' && this.get('canShowErrors');
      this.set('success', success);
      return success;
    }
  }),
  hasWarning: Ember.computed('status', 'canShowErrors', {
    get: function() {
      var warning;
      warning = this.get('validations') && this.get('status') === 'warning' && this.get('canShowErrors');
      this.set('warning', warning);
      return warning;
    }
  }),
  hasError: Ember.computed('status', 'canShowErrors', {
    get: function() {
      var error;
      error = this.get('validations') && this.get('status') === 'error' && this.get('canShowErrors');
      this.set('error', error);
      return error;
    }
  }),
  validationIcons: Ember.computed.alias('form.validationIcons'),
  successIcon: 'fa fa-check',
  warningIcon: 'fa fa-exclamation-triangle',
  errorIcon: 'fa fa-times',
  validations: true,
  yieldInLabel: false,
  validationIcon: Ember.computed('status', 'canShowErrors', {
    get: function() {
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
  hideValidationsOnFormChange: Ember.observer('form', 'form.model', function() {
    this.set('canShowErrors', false);
  }),
  shouldShowErrors: Ember.computed('canShowErrors', 'helpText', {
    get: function() {
      var text = this.get('helpText') || "";
      return text.length > 0 && this.get('canShowErrors');
    }
  }),
  helpText: Ember.computed('text', 'errors.firstObject', {
    get: function() {
      return this.get('errors.firstObject.message') || this.get('errors.firstObject') || this.get('text');
    }
  }),
  hasSetForm: false,
  didReceiveAttrs(arg) {
    this._super(...arguments);
    if(!!arg.newAttrs.form && !this.get('hasSetForm')){
      this.set('hasSetForm', true);
    }
    else if(!arg.newAttrs.form && !this.get('hasSetForm')){
      Ember.deprecate('Please use the new form.input helper defined in 1.0.0beta10', !!arg.newAttrs.form, {id: 'ember-rapid-forms.yielded-form', until: 'v1.0'});
      Ember.defineProperty(this, 'form', Ember.computed.alias('formFromPartentView'));
      this.set('hasSetForm', true);
    }

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

  label: Ember.computed(function () {
    const i18n = this.get('i18n');

    if(Ember.isPresent(i18n)) {
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
  }),

  required: Ember.computed('property', 'validations.attrs.@each.options.presence.presence', function () {
    const property = this.get('property');

    return this.get(`model.validations.attrs.${property}.options.presence.presence`) || false;
  }),

  id: Ember.computed('inputId', 'cid', 'property', {
    get: function() {
      if (this.get('cid')) {
        return this.get('cid');
      } else {
        return `${this.get('property')}-${this.elementId}`;
      }
    }
  })
});
