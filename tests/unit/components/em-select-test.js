import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

// TODO: Remove with ember 2.0
var originalEmberDeprecate = Ember.deprecate; // we know it is deprecated but can't do anything about it
const ownDeprecate = function(message) {
  if (message !== 'Using Ember.HTMLBars._registerHelper is deprecated. Helpers (even dashless ones) are automatically resolved.' && message !== 'ember-get-helper has been included in Ember 2.0. Use of this package is deprecated.') {
    originalEmberDeprecate.apply(this, arguments);
  } else {
    console.log('removing deprecation:', message);
  }
};

// TODO: remove when upgrading to ember 2.0
import {
  registerHelper
}
from 'ember-get-helper/utils/register-helper';

// if you are on Ember 1.13
import getHelper from 'ember-get-helper/helpers/get-glimmer';

// register it before your tests (this could be in the beforeEach, but it doesn't need to be)

registerHelper('get', getHelper);
// end TODO



var fruitSalad = null;

moduleForComponent('em-select', {
  // Specify the other units that are required for this test
  integration: true,
  beforeEach() {
    Ember.deprecate = ownDeprecate;
    fruitSalad = Ember.Object.create({
      favoriteFruit: null,
      fruits: Ember.Object.create(),
      errors: Ember.Object.create(),
      validate() {
        var promise = new Ember.RSVP.Promise((resolve) => {
          resolve('ok!');
        });
        return promise;
      }
    });
  },
  afterEach() {
    Ember.deprecate = originalEmberDeprecate;
    Ember.run(() => {
      fruitSalad.destroy();
    });
  }
});


var fruitOptions = Ember.A([{
  id: 1,
  name: 'Banana'
}, {
  id: 2,
  name: 'Pineapple'
}, {
  id: 3,
  name: 'Orange'
}, {
  id: 4,
  name: 'Apple'
}]);

test('em-select renders', function(assert) {
  this.set('fruitOptions', fruitOptions);

  this.render(hbs `{{em-select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name'}}`);

  var element = this.$();

  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  var select = element.find('select')[0];
  assert.ok(select, 'select exists');

  fruitOptions.forEach((item, index) => {
    assert.equal(select.options[index].value, item.id, 'Id ' + item.id + ' exists on select');
    assert.equal(select.options[index].text, item.name, 'Name ' + item.name + ' exists on select');
  });
});

test('em-select renders with a prompt', function(assert) {

  this.set('fruitOptions', fruitOptions);

  this.render(hbs `{{em-select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None'}}`);

  var element = this.$();

  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  var select = element.find('select')[0];
  assert.ok(select, 'select exists');
  assert.equal(select.options[0].text, 'None', 'Prompt gets rendered');
});

test('em-select can select an item', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs `{{em-select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}`);

  var element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  var select = element.find('select')[0];
  assert.ok(select.options.length > 3, 'select has options');

  Ember.run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });
  assert.equal(fruitSalad.get('favoriteFruit'), 3, 'model favorite fruit is the selection');

});

// test('em-select can select multiple items', function(assert) {

//   this.set('fruitOptions', fruitOptions);
//   this.set('fruitSalad', fruitSalad);

//   this.render(hbs `{{em-select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='fruits' model=fruitSalad propertyIsModel=true multiple=true}}`);

//   var element = this.$();
//   assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

//   var select = element.find('select')[0];
//   assert.ok(select.options.length > 3, 'select has options');

//   Ember.run(() => {
//     Ember.$(select.options).each(function() {
//       if (this.text === 'Apple' || this.text === 'Orange') {
//         this.selected = true;
//       }
//     });
//     Ember.$(select).trigger('change');
//   });

//   console.log(fruitSalad.get('fruits.content'), fruitSalad.get('fruits'));
//   assert.deepEqual(fruitSalad.get('fruits.content'), [{
//     id: 3,
//     name: 'Orange'
//   }, {
//     id: 4,
//     name: 'Apple'
//   }], 'fruits got selected');

// });
