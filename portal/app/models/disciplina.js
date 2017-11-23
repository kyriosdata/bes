import DS from 'ember-data';

export default DS.Model.extend({
  num: DS.attr(),
  nome : DS.attr(),
  sem : DS.attr(),
  ch : DS.attr(),
  obr : DS.attr(),
  nc : DS.attr(),
  eixo : DS.attr()
});
