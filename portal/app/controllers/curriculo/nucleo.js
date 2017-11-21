import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filtraPorSemestre: function (param) {
      return new Ember.RSVP.Promise(resolve => {
        this.get('store').findAll('disciplina').then(services => {
          resolve(services.filterBy('sem', parseInt(param)));
        });
      });
    },

    totalDeSemestres : function() {
      return new Ember.RSVP.Promise(resolve => {
        resolve([1,2,3,4,5,6,7,8,9]);
      });
    }
  }
});
