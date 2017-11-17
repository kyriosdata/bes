import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

App.SeIgualComponent = Ember.Component.extend({
  seIgual: function() {
    console.log('cahamdo');
    return this.get('param1') === this.get('param2');
  }.property('param1', 'param2')
});


loadInitializers(App, config.modulePrefix);

export default App;
