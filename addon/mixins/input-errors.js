import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  init: function () {
    this._super();
    this.set('visibleErrors', {});
  },

  showErrors: function() {
    this.changeErrorsVisibility(true);
  },

  hideErrors: function() {
    this.changeErrorsVisibility(false);
  },

  changeErrorsVisibility: function(visible) {
    const validatableAttributes = this.get('validations.validatableAttributes');
    const dependentValidationKeys = this.get('dependentValidationKeys');

    this.eachAttribute((key) => {
      this.set(`visibleErrors.${key}`, visible);
    });

    this.eachRelationship((key) => {
      this.set(`visibleErrors.${key}`, visible);
    });

    if (validatableAttributes) {
      validatableAttributes.forEach((key) => {
        this.set(`visibleErrors.${key}`, visible);
      });
    }

    if (dependentValidationKeys) {
      Object.keys(dependentValidationKeys).forEach((key) => {
        if (key.indexOf('.') === -1) {
          this.set(`visibleErrors.${key}`, visible);
        }
      });
    }
  }
});
