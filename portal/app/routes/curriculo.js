import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('curriculo.fluxo');
  },

  model() {
    console.log('called curriculo.fluxo route');

    return new Ember.RSVP.Promise(resolve => {
      console.log('model curriculo.js');
      this.get('store').findAll('disciplina').then(services => {
        resolve(services.filterBy('sem', 9));
      });
    });
  }
});
