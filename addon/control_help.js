import Ember from 'ember';
import InFormMixin from 'ember-rapid-forms/mixins/in_form';

/*
Form Control Help

Renders a textual help of the control.

Note: currently must be a direct descendant of a form-group or 'property' must be explicitly defined

Syntax:
{{em-form-control-help}}
 */
export default Ember.Component.extend(InFormMixin, {
  tagName: 'span',
  classNames: ['help-block'],
  classNameBindings: ['extraClass', 'horiClassCalc'],
  text: void 0,
  extraClass: void 0,
  horiClass: 'col-sm-offset-2 col-sm-10',
  horiClassCalc: Ember.computed('form.isHorizontal', function() {
    if (this.get('form.isHorizontal') && this.get('horiClass')) {
      return this.get('horiClass');
    }
  }),
  init: function() {
    this._super();
    return Ember.Binding.from('model.errors.' + this.get('parentView.propertyName')).to('errors').connect(this);
  },
  helpText: Ember.computed('text', 'errors.firstObject', function() {
    return this.get('errors.firstObject') || this.get('text');
  }),
  hasHelp: Ember.computed('helpText', function() {
    var _ref;
    return ((_ref = this.get('helpText')) != null ? _ref.length : void 0) > 0;
  }),
  hasError: Ember.computed('errors.length', function() {
    var _ref;
    return (_ref = this.get('errors')) != null ? _ref.length : void 0;
  })
});
