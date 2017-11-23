import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    console.log(params.id);

    return this.modelFor('curriculo').disciplina.filterBy("num", parseInt(params.id));

    // return new Ember.RSVP.Promise(resolve => {
    //   this.get('store').findAll('disciplina').then(services => {
    //     resolve(services.filterBy('sem', 9));
    //   });
    // });
  },

  afterModel() {
    console.log('after model app/routes/curriculo/lista.js');
  }

});
