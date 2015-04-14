import Ember from 'ember';
import InFormMixin from 'ember-rapid-forms/mixins/in_form';

/*
Form Submit Button

Syntax:
{{em-form-submit text="Submit"}}
 */
export default Ember.Component.extend(InFormMixin, {
  classes: 'btn btn-default',
  classNames: ['form-group'],
  text: 'Submit',
  type: 'submit',
  attributeBindings: ['disabled'],
  horiClass: 'col-sm-offset-2 col-sm-10',
  disabled: Ember.computed('model.isValid', function() {
    if (!Ember.isNone(this.get('model.isValid'))) {
      return !this.get('model.isValid');
    } else {
      return false;
    }
  })
});