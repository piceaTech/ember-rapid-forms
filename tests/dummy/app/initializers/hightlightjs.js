import { next } from '@ember/runloop';
import Route from '@ember/routing/route';
/*global hljs*/

export default {
  name: 'hightlightjs',
  initialize() {
    return Route.reopen({
      renderTemplate() {
        this._super();
        return next(this, function() {
          return $('pre code').each(function(i, e) {
            return hljs.highlightBlock(e);
          });
        });
      }
    });
  }
};
