// import {
//   moduleForComponent,
//   test
//   } from 'ember-qunit';
// import Ember from 'ember';
// import hbs from 'htmlbars-inline-precompile';

// var fruitSalad = null;

// moduleForComponent('em-select', {
//   // Specify the other units that are required for this test
//   integration: true,
//   beforeEach() {
//     fruitSalad = Ember.Object.create({
//       favoriteFruit: null,
//       fruits: Ember.Object.create(),
//       errors: Ember.Object.create(),
//       validate() {
//         var promise = new Ember.RSVP.Promise((resolve) => {
//           resolve('ok!');
//         });
//         return promise;
//       }
//     });
//   },
//   afterEach() {
//     Ember.run(() => {
//       fruitSalad.destroy();
//     });
//   }
// });


// var fruitOptions = Ember.A([
//   {id: 1, name: 'Banana'},
//   {id: 2, name: 'Pineapple'},
//   {id: 3, name: 'Orange'},
//   {id: 4, name: 'Apple'}
// ]);

// test('em-select renders', function(assert) {
//   this.set('fruitOptions', fruitOptions);

//   this.render(hbs`{{em-select label="Fruits" content=fruitOptions optionValuePath='content.id' optionLabelPath='content.name'}}`);

//   var element = this.$();

//   assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

//   var select = element.find('select')[0];
//   assert.ok(select, 'select exists');

//   fruitOptions.forEach((item, index) => {
//     assert.equal(select.options[index].value, item.id, 'Id '+ item.id +' exists on select');
//     assert.equal(select.options[index].text, item.name, 'Name '+ item.name +' exists on select');
//   });
// });

// test('em-select renders with a prompt', function(assert) {

//   var component = this.subject({
//     label: 'Fruits:',
//     content: fruitOptions,
//     optionValuePath: 'content.id',
//     optionLabelPath: 'content.name',
//     prompt: 'None'
//   });

//   this.render();
//   var element = this.$();

//   assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

//   var select = element.find('select')[0];
//   assert.ok(select, 'select exists');
//   assert.equal(select.options[0].text, 'None', 'Prompt gets rendered');
// });

// test('em-select can select an item', function(assert) {

//   var component = this.subject({
//     label: 'Fruits:',
//     content: fruitOptions,
//     propertyName: 'favoriteFruit',
//     optionValuePath: 'content.id',
//     optionLabelPath: 'content.name',
//     model: fruitSalad
//   });

//   this.render();
//   var element = this.$();
//   assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

//   var select = element.find('select')[0];
//   assert.ok(select.options.length > 3, 'select has options');

//   Ember.run(() => {
//     Ember.$(select).val('3');
//     Ember.$(select).trigger('change');
//   });

//   assert.equal(component.get('selection.name'), 'Orange', 'Orange got selected');
//   assert.equal(fruitSalad.get('favoriteFruit'), 3, 'model favorite fruit is the selection');

// });

// test('em-select can select multiple items', function(assert) {

//   var component = this.subject({
//     label: 'Fruits:',
//     content: fruitOptions,
//     propertyName: 'fruits',
//     optionValuePath: 'content.id',
//     optionLabelPath: 'content.name',
//     model: fruitSalad,
//     propertyIsModel: true,
//     multiple: true
//   });

//   this.render();
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

//   assert.deepEqual(component.get('selection'), [{id: 3, name: 'Orange'}, {id: 4, name: 'Apple'}], "Apple and Oranges");
//   assert.deepEqual(fruitSalad.get('fruits.content'), [{id: 3, name: 'Orange'}, {id: 4, name: 'Apple'}], 'fruits got selected');

// });
