import Ember from 'ember';
import HasIdMixin from '../mixins/has-id';
import layout from '../templates/components/em-custom-input';

/*
Form Input

Syntax:
{{#em-custom-input property="property name"}}Something{{/em-custom-input}}
 */
export default Ember.Component.extend(HasIdMixin, {
  layout: layout,
  elementClass: null,
  property: null,
  label: null,
  name: null,
  placeholder: null,
  autofocus: null,
  disabled: null,

  init() {
    this._super(...arguments);

    this.set('id', this.get('inputId'));
    this.set('class', this.get('elementClass'));
  }
});
