import Ember from 'ember';
/*global alert*/

export default Ember.Component.extend({
    layout: 'default',
    genderOptions: Ember.A([
        {
            id: 'M',
            name: 'Male'
        }, {
            id: 'F',
            name: 'Female'
        }, {
            id: 'O',
            name: 'Other'
        }
    ]),
    actions: {
        validate: function() {
            this.model.validate().then(function() {
            }, () => {
                this.model.showErrors();
            });
        },
        clearValidations: function() {
            this.model.hideErrors();
        },
        submit: function() {
            return alert("Submitted!");
        },
        layout: function(t) {
            return this.set('layout', t);
        }
    }
});
