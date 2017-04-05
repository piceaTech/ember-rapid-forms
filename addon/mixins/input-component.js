import Ember from 'ember';
import HasIdMixin from './has-id';
import HasPropertyMixin from 'ember-rapid-forms/mixins/has-property';
import HasPropertyValidationMixin from 'ember-rapid-forms/mixins/has-property-validation';

const { Mixin, computed, observer, deprecate, defineProperty } = Ember;

/*
A mixin that enriches a component that is attached to a model property.

The property name by default is taken from the formComponent unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create(HasPropertyMixin, HasPropertyValidationMixin, HasIdMixin, {
  validations: true,

  hasSuccess: computed('status', 'canShowErrors', {
    get() {
      return this._hasStatus('success');
    }
  }),

  hasWarning: computed('status', 'canShowErrors', {
    get() {
      return this._hasStatus('warning');
    }
  }),

  hasError: computed('status', 'canShowErrors', {
    get() {
      return this._hasStatus('error');
    }
  }),

  shouldShowErrors: computed('canShowErrors', 'helpText', {
    get() {
      const text = this.get('helpText') || "";
      return text.length > 0 && this.get('canShowErrors');
    }
  }),

  helpText: computed('text', 'errors.firstObject', {
    get() {
      return this.get('errors.firstObject.message') || this.get('errors.firstObject') || this.get('text');
    }
  }),

  controlWrapper: computed('form.formLayout', {
    get() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-10';
      }
      return null;
    }
  }),

  propertyOptions: Ember.computed('property', 'validations.attrs.@each.options', function() {
    const property = this.get('property');

    return this.get(`model.validations.attrs.${property}.options`) || false;
  }),

  required: Ember.computed('propertyOptions.presence.presence', function() {
    return this.get('propertyOptions.presence.presence') || false;
  }),

  formSubmitted: observer('form.isSubmitted', 'form.showErrorsOnSubmit', 'errors.length', function () {
    if (this.get('errors.length') && this.get('form.showErrorsOnSubmit') && this.get('form.isSubmitted')) {
      this.set('canShowErrors', true);
    }
  }),

  hideValidationsOnFormChange: observer('form', 'form.model', function() {
    this.set('canShowErrors', false);
  }),

  init() {
    this._super(...arguments);
    if (this.get('form.showErrorsOnRender')) {
      this.set('canShowErrors', true);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    const hasForm = !!this.get('form');
    if(hasForm && !this.get('hasSetForm')){
      this.set('hasSetForm', true);
    }
    else if(hasForm && !this.get('hasSetForm')){
      deprecate('Please use the new form.input helper defined in 1.0.0beta10', hasForm, {id: 'ember-rapid-forms.yielded-form', until: 'v1.0'});
      defineProperty(this, 'form', computed.alias('formFromPartentView'));
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

  _hasStatus(type) {
    const status = this.get('validations') && this.get('status') === type
      && this.get('canShowErrors');
    this.set(type, type);
    return status;
  }
});
