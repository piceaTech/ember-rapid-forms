/*
Copied from GCorbel from https://github.com/piceaTech/ember-rapid-forms/issues/139#issuecomment-257280656
*/

import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);

    this.eachAttribute(attribute=> {
      this.addObserver(attribute, function () {
        this._copyErrors(this, attribute);
      });
    });

    this.eachRelationship(attribute=> {
      this.addObserver(attribute, function () {
        this._copyErrors(this, attribute);
      });
    });
  },

  validate() {
    return this.get('validations').validate(...arguments)
      .then(()=> {
        const modelErrors = this.get('errors');

        if (this instanceof DS.Model && !Ember.isNone(modelErrors) && Ember.canInvoke(modelErrors, 'add')) {
          this.eachAttribute(attribute=> {
            this._copyErrors(this, attribute);
          });
          this.eachRelationship(attribute=> {
            this._copyErrors(this, attribute);
          });
        }
      });
  },

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

    if (messages && messages.length > 0) {
      messages.forEach(m=> {
        modelErrors._add(attribute, m);
      });
    }

    const isEmpty = modelErrors.get('isEmpty');

    if (wasEmpty && !isEmpty) {
      modelErrors.trigger('becameInvalid');
    } else if (!wasEmpty && isEmpty) {
      modelErrors.trigger('becameValid');
    }
  }
});