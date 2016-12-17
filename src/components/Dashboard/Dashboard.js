import React from 'react';
import classnames from 'classnames';

function Dashboard({ children }) {
  return (
    <div className={classnames('ui-dashboard')}>
      <div className={classnames('ui-dashboard-items')}>
        {children}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
};

Dashboard.defaultProps = {
};

export default Dashboard;
