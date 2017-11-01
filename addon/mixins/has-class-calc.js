import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  horiClassCalc: computed('form.isHorizontal', {
    get() {
      return this._classCalc('form.isHorizontal', 'horiClass');
    }
  }),

  inlineClassCalc: computed('form.formLayout', {
    get() {
      return this._classCalc('form.isInline', 'inlineClass');
    }
  }),

  _classCalc(condition, cssClass) {
    if (this.get(condition) && this.get(cssClass)) {
      return this.get(cssClass);
    }
  }
});
