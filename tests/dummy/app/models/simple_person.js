import Ember from 'ember';
import DS from 'ember-data';
import EV from 'ember-validations';

var SimplePerson = DS.Model.extend(EV, {
  name: DS.attr('string'),
  password: DS.attr('string'),
  comment: DS.attr('string'),
  active: DS.attr('boolean'),
  gender: DS.attr('string'),
  nameHasValue: Ember.computed('name', {
    get: function() {
      return !!this.get('name');
    }
  }),

  asjson: Ember.computed('name', 'password', 'comment', 'active', 'gender', function() {
    return "name: " + (this.get('name')) + ", password: " + (this.get('password')) + ", comment: " + (this.get('comment')) + ", active: " + (this.get('active')) + ", gender: " + (this.get('gender'));
  })
});

SimplePerson.reopen({
  validations: {
    name: {
      presence: true,
      length: {
        minimum: 5
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
