import { parseInt, isString, isArray } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const spacingStyles = (definitions) => {
  const styles = {};
  Object.keys(definitions).forEach((type) => {
    const definition = definitions[type];
    if (isString(definition)) {
      const lastChar = definition.substr(
        definition.length - 1,
        definition.length
      );
      const match = definition.match(/[0-9.]{1,4}/);
      if (isArray(match)) {
        const size = parseInt(parseFloat(match[0]) * 10);
        const px = `${size}px`;
        const mapping = {
          x: px,
          b: `0 0 ${px} 0`,
          r: `0 ${px} 0 0`,
          l: `0 0 0 ${px}`,
          t: `${px} 0 0 0`,
          v: `${px} 0`,
          h: `0 ${px}`,
        };
        const mapped = mapping[lastChar];
        styles[type] = mapped;
      }
    }
  });
  return styles;
};
