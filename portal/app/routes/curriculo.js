import Route from '@ember/routing/route';

export default Route.extend({
  host: 'http://abcd.x.br',
  model() {
    return this.get('store').findAll('disciplina');
    // return [
    //   { id: 'Uma Disciplina'}
    // ];
  }
});
