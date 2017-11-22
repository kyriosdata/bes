import { helper } from '@ember/component/helper';

export function exibeEixo(eixo) {

  switch (eixo[0]) {
    case "computação":
      return "COM";
    case "matemática":
      return "MAT";
    case "construção":
      return "CON";
    case "design":
      return "DES";
    case "sistemas":
      return "SIS";
    case "processos":
      return "PRO";
    default:
      return "ERRO";
  }
}

export default helper(exibeEixo);
