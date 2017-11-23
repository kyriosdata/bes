import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    let dados = [];

    payload.forEach(function(e){
      var attrs = {
        descricao : e.descricao,
        tipo : e.tipo,
        basica : e.basica,
        ano: e.ano,
        lingua: e.lingua,
        bc: e.bc,
        url: e.url
      };

      var dado = {
        id : e.id,
        type: "bibliografia",
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
