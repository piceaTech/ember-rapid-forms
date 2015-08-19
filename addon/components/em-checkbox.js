import Ember from 'ember';
import FormGroupComponent from './em-form-group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default FormGroupComponent.extend({
  v_icons: Ember.computed.deprecatingAlias('validationIcons'),
  validationIcons: false,
  validations: false,
  yieldInLabel: true,
  htmlComponent: 'ember-rapid-forms/html-checkbox',
  wrapperClass: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-offset-2 col-sm-10';
    }
  }),
  labelWrapperClass: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'checkbox';
    }
    return null;
  }),
  "class": Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') !== 'horizontal') {
      return 'checkbox';
    }
    return 'form-group';
  })
});
