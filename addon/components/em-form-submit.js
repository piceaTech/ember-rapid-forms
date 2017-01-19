import Ember from 'ember';
import layout from '../templates/components/em-form-submit';

/*
Form Submit Button

Syntax:
{{em-form-submit text="Submit"}}
 */
export default Ember.Component.extend({
  layout: layout,
  classes: 'btn btn-default',
  classNames: ['form-group'],
  text: 'Submit',
  type: 'submit',
  horiClass: 'col-sm-offset-2 col-sm-10',
  disabled: Ember.computed('model.isValid', {
    get: function() {
      if (this.get('form.showErrorsOnSubmit') && !this.get('form.isSubmitted')) {
        return false;
      }

      if (!Ember.isNone(this.get('model.isValid'))) {
        return !this.get('model.isValid');
      } else {
        return false;
      }
    }
  })
});
