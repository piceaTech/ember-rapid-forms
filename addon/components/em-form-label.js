import Ember from 'ember';
import layout from '../templates/components/em-form-label';
import HasClassClacMixin from '../mixins/has-class-calc';

const { Component } = Ember;

/*
Form Label

When styled with bootstrap, when form is rendered horizontally, the label require the 'extraClass' property to
    be set to a value such 'col-sm-2' to be aligned properly.

Syntax:
{{em-form-label
    text="Some label"
    extraClass="col-sm-2"
}}

Or can serve as a block helper for elements that needs to be wrapped within label element.
{{#em-form-label text="Active?"}}
    {{em-checkbox}}
{{/em-form-label}}
 */
export default Component.extend(HasClassClacMixin, {
  layout: layout,
  tagName: 'label',
  classNames: ['control-label'],
  classNameBindings: ['extraClass', 'inlineClassCalc', 'horiClassCalc'],
  attributeBindings: ['for'],
  horiClass: 'col-sm-2',
  inlineClass: 'sr-only'
});
