import Ember from 'ember';
import FormGroupComponent from './em-form-group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Text Area

Syntax:
{{em-text property="property name" rows=4 cols=40}}
 */
export default FormGroupComponent.extend({
  controlView: Ember.TextArea.extend(ControlMixin, {
    placeholder: Ember.computed.alias('mainComponent.placeholder'),
    model: Ember.computed.alias('mainComponent.model'),
    propertyName: Ember.computed.alias('mainComponent.propertyName'),
    rows: Ember.computed.alias('mainComponent.rows'),
    cols: Ember.computed.alias('mainComponent.cols'),
    disabled: Ember.computed.alias('parentView.disabled')
  }),
  property: null,
  label: null,
  placeholder: null,
  rows: null,
  cols: null,
  disabled: null,
  controlWrapper: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  })
});
