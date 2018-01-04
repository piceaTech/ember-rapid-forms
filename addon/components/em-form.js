import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import Utils from 'ember-rapid-forms/utils/utils';
import layout from '../templates/components/em-form';

/*
Form View

A component for rendering a form element.

Syntax:
{{em-form
//The layout of the form
    form_layout="form|inline|horizontal"
//The model bound to the form if any
    model="some_model_instance"
//The action to be invoked on the controller when a form is submitted.
    action="some_action"
//if true a submit button will be rendered
    submitButton=true|false
//if true validation icons will be rendered
    validationIcons=true|false
}}
*/
export default Component.extend({
  layout: layout,
  tagName: 'form',
  classNameBindings: ['formLayoutClass'],
  attributeBindings: ['role'],
  role: 'form',
  action: 'submit',
  model: null,
  formLayout: 'form',
  submitButton: true,
  validationIcons: true,
  showErrorsOnRender: false,
  showErrorsOnFocusIn: false,
  showErrorsOnSubmit: true,

  isDefaultLayout: Utils.createBoundSwitchAccessor('form', 'formLayout', 'form'),
  isInline: Utils.createBoundSwitchAccessor('inline', 'formLayout', 'form'),
  isHorizontal: Utils.createBoundSwitchAccessor('horizontal', 'formLayout', 'form'),

  formLayoutClass: computed('formLayout', {
    get() {
      switch (this.get('formLayout')) {
        case 'horizontal':
        case 'inline':
          return "form-" + (this.get('formLayout'));
        default:
          return 'form';
      }
    }
  }),

  /*
  Form submit

  Optionally execute model validations and perform a form submission.
  */
  actions: {
    submit() {
      this._submit();
    }
  },

  submit() {
    this._submit();
    return false;
  },

  _submit() {
    const model = this.get('model');

    if (isNone(this.get('model.validate'))) {
      return this.sendAction('action', model);
    } else {
      return model.validate().then(this._sendAction(model));
    }
  },

  _sendAction(model) {
    this.set('isSubmitted', true);
    if (model.get('isValid')) {
      return this.sendAction('action', model);
    }
  }
});
