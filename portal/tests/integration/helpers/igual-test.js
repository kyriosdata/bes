
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('igual', 'helper:igual', {
  integration: true
});

test('1234 diferente de 4321', function(assert) {
  this.set('c1', '1234');
  this.render(hbs`{{igual c1 4321}}`);

  assert.equal(this.$().text().trim(), 'false');
});

test('1 igual a 1 produz true', function(assert) {
  this.set('c1', '1');
  this.set('c2', '2');
  this.render(hbs`{{igual c1 c2}}`);

  assert.equal(this.$().text().trim(), 'true');
});

