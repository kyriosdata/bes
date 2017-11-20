import Route from '@ember/routing/route';
import fetch from 'ember-fetch/ajax';

export default Route.extend({
  model() {
    debugger;
    return fetch('https://api.github.com/users/kyriosdata')
      .then(function(response) {
        return response;
      });
  }
});
