import Route from '@ember/routing/route';

export default Route.extend({

  afterModel() {
    console.log('after model app/routes/curriculo/lista.js');
  }

});
