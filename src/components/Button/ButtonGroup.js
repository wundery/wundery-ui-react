import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function ButtonGroup({ loose, children, margin, block }) {
  const style = spacingStyles({ margin });
  const className = classnames('ui-buttongroup', {
    'ui-buttongroup-snap': !loose,
    'ui-buttongroup-block': block,
  });

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: React.PropTypes.node,
  loose: React.PropTypes.bool,
  block: React.PropTypes.bool,
  margin: React.PropTypes.string,
};

export default ButtonGroup;
