import { not } from '@ember/object/computed';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import InputErrors from 'ember-rapid-forms/mixins/input-errors';
import helper from 'ember-rapid-forms/mixins/ember-cp-validations-helper';

const Validations = buildValidations({
  user: [
    validator('presence', true),
    validator('length', {
      min: 3
    })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 4
    })
  ]
});

const Credentials = DS.Model.extend(Validations, InputErrors, helper, {
  user: DS.attr('string'),
  password: DS.attr('string'),
  isntValid: not('isValid')
});

export default Credentials;
