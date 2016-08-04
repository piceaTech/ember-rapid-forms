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

test('em-select can select the model itself', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs `{{em-select label="Fruits:" content=fruitOptions propertyIsModel=true optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}`);

  var element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  var select = element.find('select')[0];
  assert.ok(select.options.length > 3, 'select has options');

  Ember.run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });

  assert.equal(fruitSalad.get('favoriteFruit.id'), 3, 'model favorite fruit is the selection');
  assert.equal(fruitSalad.get('favoriteFruit.name'), 'Orange', 'model favorite fruit is the selection');

});

test('Textarea renders with custom css', function(assert) {
  this.render(hbs`{{em-select elementClass="col-md-6"}}`);

  assert.ok(this.$().find('select').hasClass('col-md-6'), 'Select has correct class');
});

test('cid correctly sets the id for the select and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{em-select label="some label" cid='test-cid'}}`);

  assert.equal(this.$('select').attr('id'), 'test-cid', 'select has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the select', function(assert) {
  this.render(hbs`{{em-select label="some label" property='test-cid'}}`);

  assert.equal(this.$('select').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the select');
});

test('Input can be a required field', function(assert) {
  this.render(hbs`{{em-select required=true}}`);

  assert.ok(this.$().find('select').attr('required'), 'select becomes a required field');
});

test('Input can be a disabled field', function(assert) {
  this.render(hbs`{{em-select disabled=true}}`);

  assert.ok(this.$().find('select').attr('disabled'), 'select becomes a disabled field');
});

test('Input can be a autofocus field', function(assert) {
  this.render(hbs`{{em-select autofocus=true}}`);

  assert.ok(this.$().find('select').attr('autofocus'), 'select becomes a autofocus field');
});

test('Input can have a size', function(assert) {
  this.render(hbs`{{em-select size=3}}`);

  assert.equal(this.$().find('select').attr('size'), 3, 'select has a size field');
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
