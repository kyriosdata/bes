import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('curriculo.fluxo');
  },

  model() {
    console.log('called curriculo.fluxo route');

    return new Ember.RSVP.Promise(resolve => {
      this.get('store').findAll('disciplina').then(services => {
        debugger;
        resolve(services.filterBy('sem', 1));
      });
    });
  }
});
