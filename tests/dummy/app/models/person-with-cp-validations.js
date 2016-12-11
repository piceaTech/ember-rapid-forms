import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import InputErrors from 'ember-rapid-forms/mixins/input-errors';
import helper from 'ember-rapid-forms/mixins/ember-cp-validations-helper';

const Validations = buildValidations({
  fullName: [
    validator('format', {
      regex: /^[^\s]+(\s[^\s]+)+$/,
      message: 'enter a first and last name'
    }),
    validator('presence', true),
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 6
    })
  ],
  comment: validator('presence', true),
  gender: validator('presence', true),
});

const person = DS.Model.extend(Validations, InputErrors, helper, {
  firstName: DS.attr('string', { defaultValue: null }),
  lastName: DS.attr('string', { defaultValue: null }),
  password: DS.attr('string'),
  comment: DS.attr('string'),
  active: DS.attr('boolean'),
  gender: DS.attr('string'),
  nameHasValue: Ember.computed('fullName', {
    get: function() {
      return !!this.get('fullName');
    }
  }),

  fullName: Ember.computed('firstName', 'lastName', {
    //jshint unused:false
    get: function() {
      if (this.get('firstName')) {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      }
      else {
        return null;
      }
    },
    set: function(key, value) {
      let [firstName, lastName] = value.split(/\s+/);
      firstName = firstName ? firstName : null;
      lastName = lastName ? lastName : null;
      this.setProperties({ firstName, lastName });
      return value;
    }
  }),

  asjson: Ember.computed('fullName', 'firstName', 'lastName', 'password', 'comment', 'active', 'gender', function() {
    return "fullName: " + (this.get('fullName')) + ", firstName: " + (this.get('firstName')) + ", lastName: " + (this.get('lastName')) + ", password: " + (this.get('password')) + ", comment: " + (this.get('comment')) + ", active: " + (this.get('active')) + ", gender: " + (this.get('gender'));
  })
});


export default person;
