import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    console.log('beforeModel app/routes/curriculo');

    this.replaceWith('curriculo.lista', 1);
  },

  model() {
    console.log('model app/routes/curriculo.js');

    return this.get("store").findAll("disciplina");

    // Abaixo ilustra como aplicar um filtro
    // return new Ember.RSVP.Promise(resolve => {
    //   this.get('store').findAll('disciplina').then(services => {
    //     resolve(services.filterBy('sem', 9));
    //   });
    // });
  },

  afterModel() {
    console.log('after model app/routes/curriculo.js');
  }
});
