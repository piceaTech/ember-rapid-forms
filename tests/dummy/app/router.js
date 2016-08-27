import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('overview');
  this.route('getstarted');
  this.route('quickexample');
  this.route('form');


  this.route('controls', {
    resetNamespace: true
  }, function() {
    this.route('custom-submit');
    this.route('input');
    this.route('text');
    this.route('checkbox');
    this.route('select');
    this.route('html5');
    this.route('wrapped-input');
    this.route('custom-styles');
  });
});

export default Router;
