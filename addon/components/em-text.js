import Ember from 'ember';
import FormGroupComponent from './em-form-group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-text property="property name" rows=4}}
 */
export default FormGroupComponent.extend({
  controlView: Ember.TextArea.extend(ControlMixin, {
    attributeBindings: ['placeholder'],
    placeholder: Ember.computed.alias('mainComponent.placeholder'),
    model: Ember.computed.alias('mainComponent.model'),
    propertyName: Ember.computed.alias('mainComponent.propertyName'),
    rows: Ember.computed.alias('mainComponent.rows')
  }),
  property: void 0,
  label: void 0,
  placeholder: void 0,
  rows: 4,
  controlWrapper: Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});
