import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../templates/components/em-form-submit';

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
    get() {
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
      if(typeof this.submitAction === 'function'){
        this.submitAction(this.get('form.model'));
      }
    }
  }
});
