import Route from '@ember/routing/route';

export default {
    name: 'scroll-top',
    initialize() {
        Route.reopen({
            renderTemplate() {
                this._super();
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
            }
        });
    }
};
