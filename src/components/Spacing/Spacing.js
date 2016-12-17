import React from 'react';
import classnames from 'classnames';
import alignable from '../../decorators/alignable';
import { spacingStyles } from './utils';

const Spacing = (props) => {
  const children = props.children;
  const margin = props.margin;
  const padding = props.padding;
  let styles = {};

  if (margin) {
    styles = Object.assign({}, styles, spacingStyles({ margin }));
  }

  if (padding) {
    styles = Object.assign({}, styles, spacingStyles({ padding }));
  }

  return (
    <div
      style={styles}
      className={classnames({
        'ui-helpers-flexbox': props.flexbox,
      })}
    >
      {children}
    </div>
  );
};

const validator = (props, pn, cname) => {
  if (props[pn] && !/[0-9.]+x(t|l|r|b|v|h)?/.test(props[pn])) {
    return new Error(
      `Prop ${pn} in ${cname} invalid. Validation of ${props[pn]} failed.`
    );
  }
  return null;
};

Spacing.propTypes = {
  padding: validator,
  margin: validator,
  children: React.PropTypes.node,
  flexbox: React.PropTypes.bool,
};

export default alignable(Spacing);
