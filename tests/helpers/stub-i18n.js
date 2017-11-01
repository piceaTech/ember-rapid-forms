import EmberObject from '@ember/object';

export default function() {
  return EmberObject.extend({
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
