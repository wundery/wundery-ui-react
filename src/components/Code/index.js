import React from 'react';
import { spacingStyles } from '../Spacing/utils';

// eslint-disable-next-line import/prefer-default-export
export function Code({ children, margin }) {
  const style = spacingStyles({ margin });
  return <div className="ui-code" style={style}>{children}</div>;
}

Code.propTypes = {
  children: React.PropTypes.node,
  margin: React.PropTypes.string,
};
