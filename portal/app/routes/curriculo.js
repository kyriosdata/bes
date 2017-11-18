import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('curriculo.fluxo');
  },

  model() {
    return this.get('store').findAll('disciplina');
  }
});
