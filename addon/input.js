import Ember from 'ember';
import FormGroupComponent from './group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default FormGroupComponent.extend({
  controlView: Ember.TextField.extend(ControlMixin, {
    attributeBindings: ['placeholder', 'required', 'autofocus', 'disabled'],
    placeholder: Ember.computed.alias('parentView.placeholder'),
    required: Ember.computed.alias('parentView.required'),
    autofocus: Ember.computed.alias('parentView.autofocus'),
    disabled: Ember.computed.alias('parentView.disabled'),
    type: Ember.computed.alias('parentView.type'),
    model: Ember.computed.alias('parentView.model'),
    propertyName: Ember.computed.alias('parentView.propertyName')
  }),
  property: void 0,
  label: void 0,
  placeholder: void 0,
  required: void 0,
  autofocus: void 0,
  disabled: void 0,
  controlWrapper: Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});