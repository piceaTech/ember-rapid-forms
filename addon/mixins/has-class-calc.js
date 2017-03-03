import Ember from 'ember';

const { computed, Mixin } = Ember;

export default Mixin.create({
  horiClassCalc: computed('form.isHorizontal', {
    get() {
      if (this.get('form.isHorizontal') && this.get('horiClass')) {
        return this.get('horiClass');
      }
    }
  }),

  inlineClassCalc: computed('form.formLayout', {
    get() {
      if (this.get('form.isInline') && this.get('inlineClass')) {
        return this.get('inlineClass');
      }
    }
  })
});
