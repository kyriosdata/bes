import { helper } from '@ember/component/helper';

export function igual(params/*, hash*/) {
  let [c1, c2] = params;

  console.log(params);

  return c1 == c2;
}

export default helper(igual);
