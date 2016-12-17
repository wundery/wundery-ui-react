import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function Line({ children, margin, left }) {
  const style = spacingStyles({ margin });
  const className = classnames('ui-line', {
    'ui-line-label-left': left,
  });

  return (
    <div className={className} style={style}>
      {children && (
        <div className={classnames('ui-line-content')}>
          {children}
        </div>
      )}
    </div>
  );
}

Line.propTypes = {
  children: React.PropTypes.node,
  left: React.PropTypes.bool,
  margin: React.PropTypes.string,
};

export default Line;
