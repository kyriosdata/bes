export default function() {
  this.namespace = "/";
  this.passthrough("/assets/disciplinas.json");
  this.passthrough("/assets/bibliografias.json");
  this.passthrough("https://api.github.com/**");

  let disciplinas = [
    {
      type: "disciplina",
      id: 1,
      attributes: {
        nome: "Computação e Sociedade",
        ch: 64,
        sem: 1,
        nc: true
      }
    }
  ];

  this.get("/curriculo/lista/:id", function(db, request) {
    console.log("CHAMADO MIRAGE!!!!")
    return { data: disciplinas };
  })
}
