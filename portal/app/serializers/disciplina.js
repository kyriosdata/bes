import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    let dados = [];

    payload.forEach(function(e){
      var attrs = {
        nome : e.nome,
        sem : e.sem,
        ch : e.ch,
        obr : e.obr === "S",
        nc : e.nc === "S",
        eixo : e.eixo
      };

      var dado = {
        id : e.id,
        type: "disciplina",
        attributes : attrs
      };

      dados.push(dado);
    });

    while (payload.pop() != undefined) {
      payload.pop();
    }

    payload.data = dados;

    return this._super(...arguments);
  }
});
