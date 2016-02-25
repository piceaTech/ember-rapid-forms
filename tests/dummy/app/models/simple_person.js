import Ember from 'ember';
import DS from 'ember-data';
import EV from 'ember-validations';
import InputErrors from 'ember-rapid-forms/mixins/input-errors';

var SimplePerson = DS.Model.extend(EV, InputErrors, {
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

SimplePerson.reopen({
  validations: {
    fullName: {
      format: {
        with: /^[^\s]+(\s[^\s]+)+$/,
        message: "enter a first and last name"
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 6
      }
    },
    comment: {
      presence: true
    },
    gender: {
      presence: true
    }
  }
});

export default SimplePerson;
