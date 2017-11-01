import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/em-form-control-help';
import HasClassClacMixin from '../mixins/has-class-calc';

/*
Form Control Help

Renders a textual help of the control.

Note: currently must be a direct descendant of a form-group or 'property' must be explicitly defined

Syntax:
{{em-form-control-help}}
 */
export default Component.extend(HasClassClacMixin, {
  layout: layout,
  tagName: 'span',
  classNames: ['help-block'],
  classNameBindings: ['extraClass', 'horiClassCalc'],
  text: null,
  extraClass: null,
  horiClass: 'col-sm-offset-2 col-sm-10',

  errors: alias('formComponent.errors'),
  hasError: alias('formComponent.hasError')
});
