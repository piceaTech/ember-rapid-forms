import Ember from 'ember';

export default {
    name: 'scroll-top',
    initialize: function() {
        Ember.Route.reopen({
            renderTemplate: function() {
                this._super();
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
            }
        });
    }
};
