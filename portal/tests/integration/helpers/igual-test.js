
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('igual', 'helper:igual', {
  integration: true
});

test('it renders', function(assert) {
  this.set('c1', '1234');

  this.render(hbs`{{igual c1 4321}}`);

  assert.equal(this.$().text().trim(), 'false');
});

