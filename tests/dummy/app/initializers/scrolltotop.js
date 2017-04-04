import Ember from 'ember';

export default {
    name: 'scroll-top',
    initialize() {
        Ember.Route.reopen({
            renderTemplate() {
                this._super();
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
            }
        });
    }
};
