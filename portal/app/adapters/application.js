import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  buildURL: function() {
    return config.rootURL + "/assets/disciplinas.json";
  }
});
