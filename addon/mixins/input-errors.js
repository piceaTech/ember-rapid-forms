import Ember from 'ember';

export default Ember.Mixin.create({
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
    this.eachAttribute((key) => {
      this.set(`visibleErrors.${key}`, visible);
    });
    this.eachRelationship((key) => {
      this.set(`visibleErrors.${key}`, visible);
    });
    Object.keys(this.get('dependentValidationKeys')).forEach((key) => {
      if (key.indexOf('.') === -1) {
        this.set(`visibleErrors.${key}`, visible);
      }
    });
  }
});
