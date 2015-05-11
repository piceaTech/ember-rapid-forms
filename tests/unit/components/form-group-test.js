import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('form-group', {
  // Specify the other units that are required for this test
  needs: ['component:em-form-label', 'component:form-group-control',
          'component:control-within-label',
          'component:em-form-control-help', 'template:dummy']
});

test('renders the component', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    })
  });
  this.render();

  // FIXME: _parentView is a private API
  assert.ok(Ember.$(component._parentView.element).find('div:contains("dummy!")'), 'Has controlView rendered');
});

test('renders with label', function(assert) {
  var component = this.subject({
    label: 'my-label',
    controlView: Ember.View.create({
      templateName: 'dummy'
    })
  });
  this.render();

  // FIXME: _parentView is a private API
  assert.ok(Ember.$(component._parentView.element).find('div:contains("my-label")'), 'Has a label');
  assert.ok(Ember.$(component._parentView.element).find('div:contains("dummy!")'), 'Has controlView rendered');
});

test('renders with labelWrapperClass', function(assert) {
  var component = this.subject({
    label: 'my-label',
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    labelWrapperClass: 'wrapper-class'
  });
  this.render();

  // FIXME: _parentView is a private API
  var wrapper = Ember.$(component._parentView.element).find('div.wrapper-class');

  assert.ok(wrapper, 'Wrapper exists');
  assert.ok(wrapper.find('div:contains("my-label")'), 'Label is inside wrapper');
  assert.ok(wrapper.find('div:contains("dummy!")'), 'Has controlView rendered');
});

test('renders with yieldInLabel', function(assert) {
  var component = this.subject({
    label: 'my-label',
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    yieldInLabel: true
  });
  this.render();

  // FIXME: _parentView is a private API
  var label = Ember.$(component._parentView.element).find('label');
  assert.ok(label, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
  assert.ok(label.find('div:contains("dummy!")'), 'Label has controlView div');
});

test('renders with yieldInLabel with labelWrapperClass', function(assert) {
  var component = this.subject({
    label: 'my-label',
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    labelWrapperClass: 'wrapper-class',
    yieldInLabel: true
  });
  this.render();

  // FIXME: _parentView is a private API
  var wrapper = Ember.$(component._parentView.element).find('div.wrapper-class');
  assert.ok(wrapper, 'Wrapper exists');

  var label = wrapper.find('label');
  assert.ok(label, 'Label is a wrapper tag');
  assert.ok(label.text().indexOf('my-label') > -1, 'Label is set correctly');
  assert.ok(label.find('div:contains("dummy!")'), 'Label has controlView div');
});

test('renders v_icon', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    v_icons: true,
    mainComponent: Ember.Component.create({
      v_icon: 'some-icon-class'
    })
  });
  this.render();

  // FIXME: _parentView is a private API
  var icons = Ember.$(component._parentView.element).find('span');
  assert.ok(icons, 'Has icon span');
  assert.ok(icons.hasClass('form-control-feedback'), 'Has proper class');
  assert.ok(icons.find('i'), 'Has icon');
  assert.ok(Ember.$(icons.find('i')[0]).hasClass('some-icon-class'), 'Icon has proper class');
});

test('renders error message', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    shouldShowErrors: true,
    help: 'help text here'
  });
  this.render();

  // FIXME: _parentView is a private API
  var parent = Ember.$(component._parentView.element);
  assert.ok(parent.find('div:contains("dummy!")'), 'Has controlView rendered');

  var helpSpan = parent.find('span');
  assert.ok(helpSpan, 'Has help span');
  assert.ok(helpSpan.hasClass('help-block'), 'span has correct class');
  assert.ok(helpSpan.text().trim(), 'help text here', 'span has correct help text');
});

test('does not renders error message when layout is inline', function(assert) {
  var component = this.subject({
    controlView: Ember.View.create({
      templateName: 'dummy'
    }),
    form: Ember.Object.create({
      isInline: true
    }),
    shouldShowErrors: true,
    help: 'help text here'
  });
  this.render();

  // FIXME: _parentView is a private API
  var parent = Ember.$(component._parentView.element);
  assert.ok(parent.find('div:contains("dummy!")'), 'Has controlView rendered');

  var helpSpan = parent.find('span');
  assert.equal(helpSpan.length, 0, 'Has help span');

});
