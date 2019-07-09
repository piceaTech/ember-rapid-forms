import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render, find, findAll } from '@ember/test-helpers';

import hbs from 'htmlbars-inline-precompile';


let fruitSalad = null;

module('em-select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
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
  });

  hooks.afterEach(function() {
    run(() => {
      fruitSalad.destroy();
    });
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

  test('em-select renders', async function(assert) {
    this.set('fruitOptions', fruitOptions);

    await render(
      hbs`{{#em-form as |form|}}{{form.select property="asd" label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name'}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.ok(select, 'select exists');

    fruitOptions.forEach((item, index) => {
      assert.equal(select.options[index].value, item.id, 'Id ' + item.id + ' exists on select');
      assert.equal(select.options[index].text, item.name, 'Name ' + item.name + ' exists on select');
    });
  });

  test('em-select renders with a prompt', async function(assert) {

    this.set('fruitOptions', fruitOptions);

    await render(
      hbs`{{#em-form as |form|}}{{form.select property="asd" label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None'}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.ok(select, 'select exists');
    assert.equal(select.options[0].text, 'None', 'Prompt gets rendered');
  });

  test('em-select can select an item', async function(assert) {

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.equal(select.options.length, 6, 'select has correct amount of options');

    select.value = 3;
    select.dispatchEvent(new Event('change'));

    assert.equal(fruitSalad.get('favoriteFruit'), 3, 'model favorite fruit is the selection');
  });

  test('em-select can select an item when not disabled', async function(assert) {

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.equal(select.options.length, 6, 'select has correct amount of options');

    select.value = 5;
    select.dispatchEvent(new Event('change'));

    assert.equal(fruitSalad.get('favoriteFruit'), 5, 'model favorite fruit is the selection');

  });

  test('em-select can\'t select an item when disabled', async function(assert) {

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' optionDisabledPath='disabled' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`
    );

    
    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.equal(select.options.length, 6, 'select has correct amount of options');

    select.value = 5;
    select.dispatchEvent(new Event('change'));

    assert.equal(fruitSalad.get('favoriteFruit'), null, 'model favorite fruit is the selection');

  });

  test('em-select selects the first item when the is no prompt', async function(assert) {

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.equal(select.options.length, 5, 'select has correct amount of options');

    assert.equal(fruitSalad.get('favoriteFruit'), 1, 'model favorite fruit is the selection');

  });

  test('em-select can select the model itself', async function(assert) {

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Fruits:" content=fruitOptions propertyIsModel=true optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

    const select = find('select');
    assert.equal(select.options.length, 6, 'select has correct amount of options');

    select.value = 3;
    select.dispatchEvent(new Event('change'));

    assert.equal(fruitSalad.get('favoriteFruit.id'), 3, 'model favorite fruit is the selection');
    assert.equal(fruitSalad.get('favoriteFruit.name'), 'Orange', 'model favorite fruit is the selection');

  });


  test('em-select can select correct with optGroups', async function(assert) {

    this.set('eatables', eatables);
    this.set('fruitSalad', fruitSalad);

    await render(
      hbs`{{#em-form as |form|}}{{form.select label="Eatables:" optionLabelPath='name' prompt='None' property='favoriteFruit' model=fruitSalad
        content=eatables optionGroupLabelPath="name" optionGroupContentPath="content"}}{{/em-form}}`
    );

    assert.equal(findAll('label').filter((e) => e.textContent.includes('Eatables:')).length, 1, 'label has for property');

    const select = find('select');
    assert.ok(select.options.length === 7, 'select has correct amount of options');

    select.value = 'A';
    select.dispatchEvent(new Event('change'));

    assert.equal(fruitSalad.get('favoriteFruit'), "A", 'model favorite fruit is the selection');

  });

  test('Select renders with custom css', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select property="asd" elementClass="col-md-6"}}{{/em-form}}`);

    assert.ok(find('select').className.includes('col-md-6'), 'Select has correct class');
  });

  test('cid correctly sets the id for the select and it\'s label', async function(assert) {
    assert.expect(2);
    await render(
      hbs`{{#em-form as |form|}}{{form.select property="asd" label="some label" cid='test-cid'}}{{/em-form}}`
    );

    assert.equal(find('select').id, 'test-cid', 'select has correct id');
    assert.equal(find('label').getAttribute('for'), 'test-cid', 'label has correct \'for\'');
  });

  test('the "for" of the label is the "id" of the select', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select label="some label" property='test-cid'}}{{/em-form}}`);

    assert.equal(find('select').id, find('label').getAttribute('for'), 'the "for" of the label is not the "id" of the select');
  });

  test('Input can be a required field', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select property="asd" required=true}}{{/em-form}}`);

    assert.ok(find('select').required, 'select becomes a required field');
  });

  test('Input can be a disabled field', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select property="asd" disabled=true}}{{/em-form}}`);

    assert.ok(find('select').disabled, 'select becomes a disabled field');
  });

  test('Input can be a autofocus field', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select property="asd" autofocus=true}}{{/em-form}}`);

    assert.ok(find('select').autofocus, 'select becomes a autofocus field');
  });

  test('Input can have a size', async function(assert) {
    await render(hbs`{{#em-form as |form|}}{{form.select property="asd" size=3}}{{/em-form}}`);

    assert.equal(find('select').getAttribute('size'), 3, 'select has a size field');
  });

  test('Triggers the action', async function(assert) {
    assert.expect(1);

    this.set('fruitOptions', fruitOptions);
    this.set('fruitSalad', fruitSalad);
    this.set('action', function() {
      assert.ok(true, 'submit action invoked!');
    });

    await render(hbs`{{#em-form as |form|}}
      {{form.select content=fruitOptions property='favoriteFruit' model=fruitSalad action=action}}
      {{/em-form}}`);

    const select = find('select');

    select.value = 5;
    select.dispatchEvent(new Event('change'));

    
  });

test('em-select renders with all multiple items selected', async function(assert) {
  fruitSalad.set('fruits', [3, 4])
  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);
  await render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='fruits' model=fruitSalad}}{{/em-form}}`);


  assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

  const select = find('select');
  assert.equal(select.options.length, 5, 'select has correct amount of options');
 
  assert.deepEqual(getSelectValues(select), ['3', '4'])

});

test('em-select can select multiple items', async function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  await render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

  const select = find('select');
  assert.equal(select.options.length, 5, 'select has correct amount of options');
  run(() => {
    select.value = 5;
    setSelectValues(select, ['3', '4'])
    select.dispatchEvent(new Event('change'));
  });

  assert.deepEqual(fruitSalad.get('favoriteFruit'), [3, 4], 'model favorite fruit is the selection');

});

test('em-select uses array for single item in multiple mode', async function(assert) {

  this.set('fruitOptions', fruitOptions);
  this.set('fruitSalad', fruitSalad);

  await render(hbs`{{#em-form as |form|}}{{form.select multiple=true label="Fruits:" content=fruitOptions optionValuePath='id' optionLabelPath='name' property='favoriteFruit' model=fruitSalad}}{{/em-form}}`);

  assert.equal(findAll('label').filter((e) => e.textContent.includes('Fruits:')).length, 1, 'label has for property');

  const select = find('select');
  assert.equal(select.options.length, 5, 'select has correct amount of options');

  run(() => {
    setSelectValues(select, ['3'])
    select.dispatchEvent(new Event('change'));
  });
  assert.deepEqual(fruitSalad.get('favoriteFruit'), [3], 'model favorite fruit is the selection');

  });
});

// Return an array of the selected opion values
// select is an HTML select element
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}


function setSelectValues(select, arr) {
  var options = select && select.options;

  for (var i = 0, iLen = options.length; i<iLen; i++) {
    let opt = options[i];

    let val = opt.value || opt.text;
    opt.selected = arr.includes(val);
  }
}

