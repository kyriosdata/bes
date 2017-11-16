import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  descricao: DS.attr(),
  tipo: DS.attr(),
  num: DS.attr(),
  ch: DS.attr(),
  obr: DS.attr(),
  pag: DS.attr(),
  nc: DS.attr(),
  sem: DS.attr(),
  eixo: DS.attr()
});
