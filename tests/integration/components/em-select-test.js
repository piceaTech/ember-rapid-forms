import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

import hbs from 'htmlbars-inline-precompile';


let fruitSalad = null;

moduleForComponent('em-select', {
  // Specify the other units that are required for this test
  integration: true,
  beforeEach() {
    fruitSalad = EmberObject.create({
      favoriteFruit: null,
      fruits: EmberObject.create(),
      errors: EmberObject.create(),
      validate() {
        const promise = new EmberPromise((resolve) => {
          resolve('ok!');
        });
        return promise;
      }
    });
  },
  afterEach() {
    run(() => {
      fruitSalad.destroy();
    });
  }
});


const fruitOptions = A([{
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
}, {
  id: 5,
  name: 'Apple disabled',
  disabled: true
}]);

const eatables = A([
    {
      name: 'Fruits',
      content: A([
        {
          id: "A",
          name: "Apple"
        },{
          id: "P",
          name: "Peach"
        }])
    }, {
      name: 'Vegetables',
      content: A([
        {
          id: "T",
          name: "Tomato"
        },{
          id: "C",
          name: "Cucumber"
        }])
    }, {
      name: 'Other',
      content: A([
        {
          id: "B",
          name: "Bread"
        },{
          id: "S",
          name: "Soup"
        }])
    }
  ])

test('em-select renders', function(assert) {
  this.set('fruitOptions', fruitOptions);

  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name'}}{{/em-form}}`);

  const element = this.$();

  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.ok(select, 'select exists');

  fruitOptions.forEach((item, index) => {
    assert.equal(select.options[index].value, item.id, 'Id ' + item.id + ' exists on select');
    assert.equal(select.options[index].text, item.name, 'Name ' + item.name + ' exists on select');
  });
});

test('em-select renders with a prompt', function(assert) {

  this.set('fruitOptions', fruitOptions);

  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None'}}{{/em-form}}`);

  const element = this.$();

  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.ok(select, 'select exists');
  assert.equal(select.options[0].text, 'None', 'Prompt gets rendered');
});

test('em-select can select an item', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 6, 'select has correct amount of options');

  run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });
  assert.equal(fruitSalad.get('favoriteFruit'), 3, 'model favorite fruit is the selection');

});

test('em-select can select an item when not disabled', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 6, 'select has correct amount of options');

  run(() => {
    this.$(select).val('5');
    this.$(select).trigger('change');
  });
  assert.equal(fruitSalad.get('favoriteFruit'), 5, 'model favorite fruit is the selection');

});

test('em-select can\'t select an item when disabled', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' optionDisabledPath='disabled' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 6, 'select has correct amount of options');

  run(() => {
    this.$(select).val('5');
    this.$(select).trigger('change');
  });
  assert.equal(fruitSalad.get('favoriteFruit'), null, 'model favorite fruit is the selection');

});

test('em-select selects the first item when the is no prompt', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 5, 'select has correct amount of options');

  assert.equal(fruitSalad.get('favoriteFruit'), 1, 'model favorite fruit is the selection');

});

test('em-select can select the model itself', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions propertyIsModel=true optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 6, 'select has correct amount of options');

  run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });

  assert.equal(fruitSalad.get('favoriteFruit.id'), 3, 'model favorite fruit is the selection');
  assert.equal(fruitSalad.get('favoriteFruit.name'), 'Orange', 'model favorite fruit is the selection');

});


test('em-select can select correct with optGroups', function(assert) {

  this.set('eatables', eatables);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select label="Eatables:" optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad
    content=eatables optionGroupLabelPath="name" optionGroupContentPath="content"}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Eatables:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.ok(select.options.length === 7, 'select has correct amount of options');

  run(() => {
    this.$(select).val('A');
    this.$(select).trigger('change');
  });

  assert.equal(fruitSalad.get('favoriteFruit'), "A", 'model favorite fruit is the selection');

});

test('Select renders with custom css', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" elementClass="col-md-6"}}{{/em-form}}`);

  assert.ok(this.$().find('select').hasClass('col-md-6'), 'Select has correct class');
});

test('cid correctly sets the id for the select and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" label="some label" cid='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('select').attr('id'), 'test-cid', 'select has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the select', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select label="some label" property='test-cid'}}{{/em-form}}`);

  assert.equal(this.$('select').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the select');
});

test('Input can be a required field', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" required=true}}{{/em-form}}`);

  assert.ok(this.$().find('select').attr('required'), 'select becomes a required field');
});

test('Input can be a disabled field', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" disabled=true}}{{/em-form}}`);

  assert.ok(this.$().find('select').attr('disabled'), 'select becomes a disabled field');
});

test('Input can be a autofocus field', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" autofocus=true}}{{/em-form}}`);

  assert.ok(this.$().find('select').attr('autofocus'), 'select becomes a autofocus field');
});

test('Input can have a size', function(assert) {
  this.render(hbs`{{#em-form as |form|}}{{form.select property="asd" size=3}}{{/em-form}}`);

  assert.equal(this.$().find('select').attr('size'), 3, 'select has a size field');
});

test('Triggers the action', function(assert) {
  assert.expect(1);

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);
  this.set('action', function() {
    assert.ok(true, 'submit action invoked!');
  });

  this.render(hbs`{{#em-form as |form|}}
    {{form.select content=fruitOptions property='favoriteFruit' model=fruitSalad action=action}}
    {{/em-form}}`);

  const select = this.$().find('select')[0];

  run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });
});

test('em-select renders with all multiple items selected', function(assert) {
  fruitSalad.set('fruits', [3, 4])

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='fruits' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 5, 'select has correct amount of options');
  assert.deepEqual($(select).val(), ['3', '4'])

});

test('em-select can select multiple items', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 5, 'select has correct amount of options');

  run(() => {
    this.$(select).val(['3', '4']);
    this.$(select).trigger('change');
  });

  assert.deepEqual(fruitSalad.get('favoriteFruit'), [3, 4], 'model favorite fruit is the selection');

});

test('em-select uses array for single item in multiple mode', function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  this.render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  const element = this.$();
  assert.equal(element.find('label:contains("Fruits:")').length, 1, 'label has for property');

  const select = element.find('select')[0];
  assert.equal(select.options.length, 5, 'select has correct amount of options');

  run(() => {
    this.$(select).val('3');
    this.$(select).trigger('change');
  });
  assert.deepEqual(fruitSalad.get('favoriteFruit'), [3], 'model favorite fruit is the selection');

});
