import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // return this.get('store').findAll('disciplina');
    return [
      { id: 'Uma Disciplina'}
    ];
  }
});
