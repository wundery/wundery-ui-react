import times from 'lodash/times';

export function tableData(num = 20, prefix = 0) {
  return times(num, (i) => (
    {
      id: `${prefix}-${i}`,
      title: `Awesome product ${prefix}-${i}`,
      price_formatted: `EUR ${i}${i}${i}.${i}${i}`,
      price: parseFloat(`${i}${i}${i}.${i}${i}`)
    }
  ));
}
