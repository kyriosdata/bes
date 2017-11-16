import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL: function() {
    return "disciplinas.json";
  }
});
