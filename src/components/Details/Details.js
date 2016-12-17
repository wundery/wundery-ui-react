import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function Details({ compact, children, horizontal, margin }) {
  const className = classnames('ui-details', {
    'ui-details-compact': compact,
    'ui-details-horizontal': horizontal,
  });

  const style = spacingStyles({ margin });

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

Details.propTypes = {
  children: React.PropTypes.node,
  compact: React.PropTypes.bool,
  horizontal: React.PropTypes.bool,
  margin: React.PropTypes.string,
};

export default Details;
