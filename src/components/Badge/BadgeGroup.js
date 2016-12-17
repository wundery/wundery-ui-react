import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function BadgeGroup({ children, margin }) {
  const style = spacingStyles({ margin });

  return (
    <div className={classnames('ui-badge-group')} style={style}>
      {children}
    </div>
  );
}

BadgeGroup.propTypes = {
  children: React.PropTypes.node,
  margin: React.PropTypes.string,
};

export default BadgeGroup;
