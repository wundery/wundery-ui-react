import React from 'react';
import classnames from 'classnames';

function BoxHeader({ noPadding, compact, children, center }) {
  const className = classnames('ui-box-header', {
    'ui-box-header-no-padding': noPadding,
    'ui-box-header-compact': compact,
    'ui-box-header-center': center,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
}

BoxHeader.propTypes = {
  children: React.PropTypes.node,

  // Specifies whether padding should be removed
  noPadding: React.PropTypes.bool,
  compact: React.PropTypes.bool,
  center: React.PropTypes.bool,
};

export default BoxHeader;
