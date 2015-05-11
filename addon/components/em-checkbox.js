import Ember from 'ember';
import FormGroupComponent from './em-form-group';
import ControlMixin from 'ember-rapid-forms/mixins/control';

/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */
export default FormGroupComponent.extend({
  v_icons: Ember.computed.deprecatingAlias('validationIcons'),
  validationIcons: false,
  validations: false,
  yieldInLabel: true,
  controlView: Ember.Checkbox.extend(ControlMixin, {
    "class": false,
    model: Ember.computed.alias('form.model'),
    propertyName: Ember.computed.alias('mainComponent.propertyName'),
    init: function() {
      this._super();
      return Ember.Binding.from("model." + (this.get('propertyName'))).to('checked').connect(this);
    }
  }),
  wrapperClass: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'col-sm-offset-2 col-sm-10';
    }
  }),
  labelWrapperClass: Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') === 'horizontal') {
      return 'checkbox';
    }
    return null;
  }),
  "class": Ember.computed('form.formLayout', function() {
    if (this.get('form.formLayout') !== 'horizontal') {
      return 'checkbox';
    }
    return 'form-group';
  })
});
