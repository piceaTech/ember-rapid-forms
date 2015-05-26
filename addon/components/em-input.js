import Ember from 'ember';
import FormGroupComponent from './em-form-group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-input property="property name"}}
 */
export default FormGroupComponent.extend({
  controlView: Ember.TextField.extend(ControlMixin, {
    placeholder: Ember.computed.alias('mainComponent.placeholder'),
    name: Ember.computed.alias('mainComponent.name'),
    required: Ember.computed.alias('mainComponent.required'),
    autofocus: Ember.computed.alias('mainComponent.autofocus'),
    disabled: Ember.computed.alias('mainComponent.disabled'),
    type: Ember.computed.alias('mainComponent.type'),
    model: Ember.computed.alias('mainComponent.model'),
    propertyName: Ember.computed.alias('mainComponent.propertyName')
  }),
  property: null,
  label: null,
  name: null,
  placeholder: null,
  required: null,
  autofocus: null,
  disabled: null,
  controlWrapper: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});
