import React from 'react';

const childValidator = ({ type }) => (props, propName, componentName) => {
  const prop = props[propName];
  let error = null;

  React.Children.forEach(prop, (child) => {
    if (child.type !== type) {
      error = new Error(`${componentName} children must be of type ${type}.`);
    }
  });

  return error;
};

export default childValidator;
