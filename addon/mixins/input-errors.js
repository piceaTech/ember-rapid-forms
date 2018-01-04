import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super();
    this.set('visibleErrors', {});
  },

  showErrors() {
    this.changeErrorsVisibility(true);
  },

  hideErrors() {
    this.changeErrorsVisibility(false);
  },

  changeErrorsVisibility(visible) {
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
