import DS from 'ember-data';

export default DS.Model.extend({
  descricao: DS.attr(),
  tipo: DS.attr(),
  basica: DS.attr(),
  ano: DS.attr(),
  lingua: DS.attr(),
  bc: DS.attr(),
  url: DS.attr()
});
