import Controller from '@ember/controller';

// https://discuss.emberjs.com/t/filter-data-client-side/9681/2

export default Controller.extend({
  actions: {
    filtraPorSemestre: function (param) {
      console.log('filtraPorSemestre');
      return new Ember.RSVP.Promise(resolve => {
        this.get('store').findAll('disciplina').then(services => {
          resolve(services.filterBy('sem', parseInt(param)));
        });
      });
    }
  }
});
