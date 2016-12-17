import React from 'react';
import classnames from 'classnames';

function Sidebar({ children, embedded }) {
  const className = classnames('ui-sidebar', { 'ui-sidebar-embedded': embedded });

  return (
    <div className={className}>
      {children}
    </div>
  );
}

Sidebar.propTypes = {
  children: React.PropTypes.node,
  embedded: React.PropTypes.bool,
};

export default Sidebar;
