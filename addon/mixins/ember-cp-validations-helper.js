/*
Copied from GCorbel from https://github.com/piceaTech/ember-rapid-forms/issues/139#issuecomment-257280656
*/

import Mixin from '@ember/object/mixin';

import { isNone } from '@ember/utils';

import Ember from 'ember';

const {
  canInvoke
} = Ember;

export default Mixin.create({
  init() {
    this._super(...arguments);

    // when there is a validation error copy its message into the format we currently understand
    this.get('validations.validatableAttributes').forEach((va) =>{
      this.addObserver(va, `validations.attrs.${va}.messages`, () => {
        this._copyErrors(this, va);
      });
    });
  },

  validate() {
    return this
      .get('validations')
      .validate(...arguments)
      .then(this._copyEachErrors.bind(this));
  },

  _copyEachErrors(validations) {
    const modelErrors = this.get('errors');
    if (!isNone(modelErrors) && canInvoke(modelErrors, 'add')) {
      this.get('validations.validatableAttributes').forEach((va) =>{
        this._copyErrors(this, va);
      });
    }
    return validations;
  },

  // gets called when a message is added (that means there is a validation-error)
  _copyErrors(model, attribute) {
    if (model.currentState.stateName === 'root.loaded.saved' || model.currentState.stateName === 'root.deleted.saved') {
      return;
    }

    const modelErrors = model.get('errors');
    const wasEmpty = modelErrors.get('isEmpty');

    if (modelErrors.get(attribute)) {
      modelErrors._remove(attribute);
    }

    const messages = this.get(`validations.attrs.${attribute}.messages`);

    // manually add them to the errorObject
    if (messages && messages.length > 0) {
      messages.forEach(m=> {
        modelErrors._add(attribute, m);
      });
    }

    const isEmpty = modelErrors.get('isEmpty');

    // trigger the method whether a model is now valid or not
    if (wasEmpty && !isEmpty) {
      modelErrors.trigger('becameInvalid');
    } else if (!wasEmpty && isEmpty) {
      modelErrors.trigger('becameValid');
    }
  }
});
