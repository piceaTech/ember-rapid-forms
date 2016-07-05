import Ember from 'ember';
import InFormMixin from 'ember-rapid-forms/mixins/in-form';
import layout from '../templates/components/em-form-control-help';

/*
Form Control Help

Renders a textual help of the control.

Note: currently must be a direct descendant of a form-group or 'property' must be explicitly defined

Syntax:
{{em-form-control-help}}
 */
export default Ember.Component.extend(InFormMixin, {
  layout: layout,
  tagName: 'span',
  classNames: ['help-block'],
  classNameBindings: ['extraClass', 'horiClassCalc'],
  text: null,
  extraClass: null,
  horiClass: 'col-sm-offset-2 col-sm-10',
  horiClassCalc: Ember.computed('mainComponent.form.isHorizontal', {
    get: function() {
      if (this.get('mainComponent.form.isHorizontal') && this.get('horiClass')) {
        return this.get('horiClass');
      }
    }
  }),
  init() {
    this._super(...arguments);
    Ember.defineProperty(this, 'errors', Ember.computed.alias((`mainComponent.model.errors.${this.get('mainComponent.propertyName')}`)));
  },
  helpText: Ember.computed('text', 'errors.firstObject', {
    get: function() {
      return this.get('errors.firstObject.message') || this.get('errors.firstObject') || this.get('text');
    }
  }),
  hasHelp: Ember.computed('helpText', {
    get: function() {
      var helpText = this.get('helpText');
      if (!helpText) {
        return false;
      }
      return helpText.length > 0;
    }
  }),
  hasError: Ember.computed('errors.length', {
    get: function() {
      return this.get('errors') != null;
    }
  })
});
