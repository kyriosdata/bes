import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr("string"),
  descricao: DS.attr("string"),
  tipo: DS.attr("number"),
  num: DS.attr("number"),
  ch: DS.attr("number"),
  obr: DS.attr("string"),
  pag: DS.attr("number"),
  nc: DS.attr("string"),
  sem: DS.attr("number"),
  eixo: DS.attr("string")
});
