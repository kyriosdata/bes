import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL: function() {
    return "{{rootURL}}assets/disciplinas.json";
  }
});
