import Ember from 'ember';
import layout from '../templates/components/em-checkbox';
import InputComponentMixin from '../mixins/input-component';

const { Component, computed } = Ember;

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default Component.extend(InputComponentMixin, {
  layout: layout,
  validationIcons: false,
  validations: false,
  yieldInLabel: true,

  class: computed('form.formLayout', {
    get() {
      if (this.get('form.formLayout') !== 'horizontal') {
        return 'checkbox';
      }
      return 'form-group';
    }
  })
});
