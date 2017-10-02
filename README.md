# Ember-Rapid-Forms [![Build Status](https://travis-ci.org/piceaTech/ember-rapid-forms.svg?branch=master)](https://travis-ci.org/piceaTech/ember-rapid-forms) [![Code Climate](https://codeclimate.com/github/piceaTech/ember-rapid-forms/badges/gpa.svg)](https://codeclimate.com/github/piceaTech/ember-rapid-forms) [![Ember Observer Score](http://emberobserver.com/badges/ember-rapid-forms.svg)](http://emberobserver.com/addons/ember-rapid-forms)


Rapid, Smart, Intuitive forms for Ember.js styled with Bootstrap &amp; Validation ready.

This is a fork of the original over at https://github.com/indexiatech/ember-forms

## Installation & Tutorial

With Ember-CLI:

```
ember install ember-truth-helpers
ember install ember-rapid-forms
```

Please visit the documentation for installation & usage documentations: http://piceatech.github.io/ember-rapid-forms

### Version Support

The Plugin starting from version 1.0.0 doesn't support ember versions below 1.13. If you need support for this work with a version < 1.0.0 or alternativly use https://github.com/indexiatech/ember-forms. If you use ember 2.0, 2.1 or 2.3, you have to use ember-rapid-forms '1.0.0-beta10'.


## Plugin Development

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

To test on all ember versions:
`ember try:testall`


* `ember test --server`

## Building

* `ember build`

## Releasing a new version

* Make the required changes which follow the [Conventional Commits Specification](https://conventionalcommits.org).
* Run the script `npm run release`
* `git push --tags` && `npm publish`


## Contributing

### Process of creating a PR
1. Create PR
2. Wait for one of the Team members to review change
3. Respond to feedback
4. Get changed merged

### What a PR should include
A PR should include the following things:
* Changed Files (duuh)
* Test(s) showing what was fixed / added / deprecated
* No failing tests
* Added Documentation if needed

### Issues
* Make sure you test against master. It may already got fixed
* Search for similiar issues
* Provide a JSBin with an example if possible

## Contributors

* Asaf Shakarchi (asaf)
* Ben Limmer (blimmer)
* Brandon Parsons (brandonparsons)
* Felix Fichte (spruce)
* Jack Matthews
* Josemar Luedke (josemarluedke)
* Josh Pfosi (joshpfosi)
* Michael Latta (TechnoMage)
* Patrick Ma (fivetwentysix)
* Pedro Kiefer (pedrokiefer)

## Building and updating the Documentation

1. Build the docs: `npm run update-page`
2. Upload the new pages `git push origin gh-pages`
3. If you don't have push access create PR (see section about PR)




