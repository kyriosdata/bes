import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return fetch('https://api.github.com/users/tomdale')
      .then(function(response) {
        return response;
      });
  }
});
