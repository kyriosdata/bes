import ApplicationAdapter from './application';
import config from '../config/environment';

export default ApplicationAdapter.extend({
  buildURL: function() {
    return config.rootURL + "assets/bibliografia.json";
  }
});
