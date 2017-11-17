import Component from '@ember/component';

export default Component.extend({
  seIgual: function () {
    return this.get('param1') === this.get('param2');
  }.property('param1', 'param2')
});
