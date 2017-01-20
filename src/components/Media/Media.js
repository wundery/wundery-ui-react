import React from 'react';
import classnames from 'classnames';

const Media = ({ compact, children }) => {
  const className = classnames('ui-media', {
    'ui-media-compact': compact,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

Media.propTypes = {
  children: React.PropTypes.node,
  compact: React.PropTypes.bool,
};

Media.defaultProps = {
  compact: false,
  children: null,
};

export default Media;
