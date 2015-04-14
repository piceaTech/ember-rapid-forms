import Ember from 'ember';
import FormGroupComponent from './group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default FormGroupComponent.extend({
  v_icons: false,
  validations: false,
  yieldInLabel: true,
  controlView: Ember.Checkbox.extend(ControlMixin, {
    "class": false,
    model: Ember.computed.alias('parentView.parentView.model'),
    propertyName: Ember.computed.alias('parentView.parentView.propertyName'),
    init: function() {
      this._super();
      return Ember.Binding.from("model." + (this.get('propertyName'))).to('checked').connect(this);
    }
  }),
  wrapperClass: Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-offset-2 col-sm-10';
    }
  }),
  labelWrapperClass: Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'checkbox';
    }
    return null;
  }),
  "class": Ember.computed('form.form_layout', function() {
    if (this.get('form.form_layout') !== 'horizontal') {
      return 'checkbox';
    }
    return 'form-group';
  })
});