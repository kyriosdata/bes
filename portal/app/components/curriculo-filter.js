import Component from '@ember/component';

export default Component.extend({
  classNames: ['curriculo-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then((results) => this.set('results', results));
  },

  actions: {
    handleFilterEntry() {
      console.log('handleFilterEntry called');
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then((filterResults) => {
        filterResults.filter
        this.set('results', filterResults);});
    }
  }

});

