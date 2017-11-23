import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    console.log('beforeModel app/routes/curriculo');

    this.replaceWith('curriculo.lista', 1);
  },

  model() {
    console.log('model app/routes/curriculo.js');

    return Ember.RSVP.hash({
      disciplina: this.store.findAll("disciplina")
    });
  },

  setupController(controller, models) {
    controller.set('disciplina', models.disciplina);
    controller.set('tags', models.tags);
    controller.set('categories', models.categories);
    controller.set('weather', models.weather);
    // or, more concisely:
    // controller.setProperties(models);
  },

  afterModel() {
    console.log('after model app/routes/curriculo.js');
  }
});
