import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function Flex({ children, margin, noPadding, noWrap }) {
  const style = spacingStyles({ margin });

  const className = classnames('ui-flexgrid', {
    'ui-flexgrid-no-padding': noPadding,
    'ui-flexgrid-no-wrap': noWrap,
  });

  const itemsClassName = classnames('ui-flexgrid-items');

  return (
    <div className={className} style={style}>
      <div className={itemsClassName}>
        {children}
      </div>
    </div>
  );
}

Flex.propTypes = {
  children: React.PropTypes.node,
  margin: React.PropTypes.string,

  /**
   * Specifies whether padding should be removed
   * @type {Boolean}
   */
  noPadding: React.PropTypes.bool,

  /**
   * Specifies whether wrapping should be disabled
   * @type {Boolean}
   */
  noWrap: React.PropTypes.bool,
};

export default Flex;
