import Ember from 'ember';
import layout from '../templates/components/em-form-submit';

const { Component, computed, isNone } = Ember;

/*
Form Submit Button

Syntax:
{{em-form-submit text="Submit"}}
 */
export default Component.extend({
  layout: layout,
  classes: 'btn btn-default',
  classNames: ['form-group'],
  text: 'Submit',
  type: 'submit',
  horiClass: 'col-sm-offset-2 col-sm-10',
  disabled: computed('model.isValid', {
    get: function() {
      if (this.get('form.showErrorsOnSubmit') && !this.get('form.isSubmitted')) {
        return false;
      }

      if (!isNone(this.get('model.isValid'))) {
        return !this.get('model.isValid');
      } else {
        return false;
      }
    }
  }),

  actions: {
    submit() {
      this.sendAction('submit');
    }
  }
});
