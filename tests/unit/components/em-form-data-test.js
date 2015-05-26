import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import DS from 'ember-data';
import Ember from 'ember';

/* globals ok:true */

moduleForComponent('em-form', 'component:em-form ember-data', {
  // Specify the other units that are required for this test
  needs: ['component:em-form-submit', 'component:em-input', 'component:form-group', 'component:em-form-control-help', 'component:form-group-control']
});

var FormController = Ember.Controller.extend({
  actions: {
    submit() {
      ok(true, 'submit action invoked!');
    }
  }
});

var somePerson = Ember.Object.create({
  name: 'my-name',
  errors: Ember.Object.create(),
  validate() {
    var promise = new Ember.RSVP.Promise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('a form display DS.Errors when rendered if showErrorsOnRender is set', function(assert) {
  assert.expect(1);
  var component = this.subject({
    targetObject: FormController.create(),
    model: somePerson,
    showErrorsOnRender: true,
    template: Ember.HTMLBars.compile('{{em-input property="name"}}')
  });

  Ember.run(() => {
    var errors = DS.Errors.create();
    errors.add('name', 'name!');
    component.get('model').set('isValid', false);
    component.get('model').set('errors', errors);
  });

  this.render();

  Ember.run(() => {
    assert.equal(Ember.$(component.element).find('div:contains("name!")').length, 1, "Found help text on form");
  });
});
