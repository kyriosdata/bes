import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.modelFor('curriculo');
  },

  afterModel() {
    console.log('after model app/routes/curriculo/nucleo.js');
  }

});
