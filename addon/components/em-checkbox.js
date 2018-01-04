import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/em-checkbox';
import InputComponentMixin from '../mixins/input-component';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default Component.extend(InputComponentMixin, {
  layout: layout,
  validationIcons: false,
  validations: false,
  labelInControl: true,

  groupClass: computed('form.formLayout', {
    get() {
      if (this.get('form.formLayout') !== 'horizontal') {
        return 'checkbox';
      }
      return 'form-group';
    }
  }),

  checkboxWrapper: computed('form.formLayout', {
    get() {
      if (this.get('form.formLayout') === 'horizontal') {
        return 'checkbox';
      }
      return null;
    }
  })
});
