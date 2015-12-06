import {
  moduleForComponent,
  test
}
from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';


var fruitSalad = null;

moduleForComponent('em-select', {
  // Specify the other units that are required for this test
  integration: true,
  beforeEach() {
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

test('Textarea renders with custom css', function(assert) {
  this.render(hbs`{{em-select elementClass="col-md-6"}}`);

  assert.ok(this.$().find('select').hasClass('col-md-6'), 'Select has correct class');
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
