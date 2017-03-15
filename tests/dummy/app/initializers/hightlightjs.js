import Ember from 'ember';
/*global hljs*/

export default {
  name: 'hightlightjs',
  initialize() {
    return Ember.Route.reopen({
      renderTemplate() {
        this._super();
        return Ember.run.next(this, function() {
          return $('pre code').each(function(i, e) {
            return hljs.highlightBlock(e);
          });
        });
      }
    });
  }
};
