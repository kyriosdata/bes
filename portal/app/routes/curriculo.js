import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    console.log('beforeModel app/routes/curriculo');

    this.replaceWith('curriculo.fluxo');
  },

  model() {
    console.log('model app/routes/curriculo.js');

    return new Ember.RSVP.Promise(resolve => {
      this.get('store').findAll('disciplina').then(services => {
        resolve(services.filterBy('sem', 9));
      });
    });
  },

  afterModel() {
    console.log('after model app/routes/curriculo.js');
  }
});
