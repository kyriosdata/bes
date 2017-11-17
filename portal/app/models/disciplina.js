import DS from 'ember-data';

export default DS.Model.extend({
  nome : DS.attr(),
  sem : DS.attr(),
  ch : DS.attr(),
  obr : DS.attr(),
  nc : DS.attr()
});
