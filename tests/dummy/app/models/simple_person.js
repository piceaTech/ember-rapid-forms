import { computed } from '@ember/object';
import { Model, attr } from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import InputErrors from 'ember-rapid-forms/mixins/input-errors';
import helper from 'ember-rapid-forms/mixins/ember-cp-validations-helper';

const Validations = buildValidations({
  fullName: [
    validator('format', {
      regex: /^[^\s]+(\s[^\s]+)+$/,
      message: 'enter a first and last name'
    }),
    validator('presence', true)
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 6
    })
  ],
  comment: validator('presence', true),
  gender: validator('presence', true)
});

const person = Model.extend(Validations, InputErrors, helper, {
  firstName: attr('string', { defaultValue: null }),
  lastName: attr('string', { defaultValue: null }),
  password: attr('string'),
  comment: attr('string'),
  active: attr('boolean'),
  gender: attr('string'),
  nameHasValue: computed('fullName', {
    get() {
      return !!this.get('fullName');
    }
  }),

  fullName: computed('firstName', 'lastName', {
    //jshint unused:false
    get() {
      if (this.get('firstName')) {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      }
      else {
        return null;
      }
    },
    set(key, value) {
      let [firstName, lastName] = value.split(/\s+/);
      firstName = firstName ? firstName : null;
      lastName = lastName ? lastName : null;
      this.setProperties({ firstName, lastName });
      return value;
    }
  }),

  asjson: computed('fullName', 'firstName', 'lastName', 'password', 'comment', 'active', 'gender', function() {
    return "fullName: " + (this.get('fullName')) + ", firstName: " + (this.get('firstName')) + ", lastName: " + (this.get('lastName')) + ", password: " + (this.get('password')) + ", comment: " + (this.get('comment')) + ", active: " + (this.get('active')) + ", gender: " + (this.get('gender'));
  })
});


export default person;
