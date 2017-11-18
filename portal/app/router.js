import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('info');
  this.route('premios');
  this.route('intro', function() {
    this.route('apresentacao');
    this.route('objetivos');
    this.route('perfil');
  });
  this.route('curriculo', function() {
    this.route('nucleo');
    this.route('fluxo');
    this.route('eixo');
  });
});

export default Router;
