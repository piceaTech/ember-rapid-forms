import Ember from 'ember';

export default function() {
  return Ember.Object.extend({
    t(key) {
      return this.translations[key];
    },

    addTranslations(_, translations) {
      this.translations = translations;
    },

    exists(key) {
      return this.t(key) !== undefined;
    }
  });
}
