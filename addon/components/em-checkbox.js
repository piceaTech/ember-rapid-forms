import Ember from 'ember';
import layout from '../templates/components/em-checkbox';
import HasIdMixin from '../mixins/has-id';

const { Component, computed } = Ember;

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default Component.extend(HasIdMixin, {
  layout: layout,
  validationIcons: false,
  validations: false,
  yieldInLabel: true,

  wrapperClass: computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'col-sm-offset-2 col-sm-10';
      }
    }
  }),

  labelWrapperClass: computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'checkbox';
      }
      return null;
    }
  }),

  class: computed('form.formLayout', {
    get: function() {
      if (this.get('form.formLayout') !== 'horizontal') {
        return 'checkbox';
      }
      return 'form-group';
    }
  })
});
