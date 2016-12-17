import React from 'react';
import classnames from 'classnames';

function DashboardItem({ children, size }) {
  const className = classnames(
    'ui-dashboard-item',
    `ui-dashboard-item-size-${size}`,
  );

  return (
    <div className={className}>
      {children}
    </div>
  );
}

DashboardItem.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.oneOf(['default', 'wide', 'full']).isRequired,
};

DashboardItem.defaultProps = {
  size: 'default',
};
export default DashboardItem;
