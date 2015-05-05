import Ember from 'ember';
import FormGroupComponent from './group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-text property="property name" rows=4}}
 */
export default FormGroupComponent.extend({
  controlView: Ember.TextArea.extend(ControlMixin, {
    attributeBindings: ['placeholder'],
    placeholder: Ember.computed.alias('parentView.placeholder'),
    model: Ember.computed.alias('parentView.model'),
    propertyName: Ember.computed.alias('parentView.propertyName'),
    rows: Ember.computed.alias('parentView.rows')
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
