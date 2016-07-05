import Ember from 'ember';
import FormGroupComponent from './em-form-group';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default FormGroupComponent.extend({
  validationIcons: false,
  validations: false,
  yieldInLabel: true,
  htmlComponent: 'erf-html-checkbox',
  wrapperClass: Ember.computed('mainComponent.form.formLayout', {
    get: function() {
      if (this.get('mainComponent.form.formLayout') === 'horizontal') {
        return 'col-sm-offset-2 col-sm-10';
      }
    }
  }),
  labelWrapperClass: Ember.computed('mainComponent.form.formLayout', {
    get: function() {
      if (this.get('mainComponent.form.formLayout') === 'horizontal') {
        return 'checkbox';
      }
      return null;
    }
  }),
  "class": Ember.computed('mainComponent.form.formLayout', {
    get: function() {
      if (this.get('mainComponent.form.formLayout') !== 'horizontal') {
        return 'checkbox';
      }
      return 'form-group';
    }
  })
});
